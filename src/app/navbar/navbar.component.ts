
import {fromEvent as observableFromEvent,  Observable } from 'rxjs';

import {debounceTime} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  scrollbarPosition: number;
  shown = true;
  openSearch = false;
  constructor(public auth: AuthService) { }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
    location.reload();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  closeSearch() { this.openSearch = false; }

  ngOnInit() {
    if(location.href.includes("pos")) {
      this.shown = false;
    } else {
      this.shown = true;
      observableFromEvent(window, 'scroll').pipe(
        debounceTime(20))
        .subscribe((event) => this.scrollbarPosition = document.body.scrollTop);
    }

    if (this.isAuthenticated() && !this.auth.user) {
      this.auth.getProfile().subscribe((info) => this.auth.user = info);
    }  
  }
}
