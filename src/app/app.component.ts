import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public auth: AuthService) {
    auth.scheduleRenewal();
  }
  
  ngOnInit() {}
}
