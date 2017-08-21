import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, ViewChildren } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { VideoService } from "app/video/video.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [VideoService]
})
export class SearchComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() open: boolean =  false;
  @ViewChildren('searchInput') searchInput;
  result: any = { Data: [], Total: 0 };

  constructor(private videoService: VideoService) { }

  ngOnInit() { }
  
  toggle() {
    if (!this.open) {
      this.openSearch();
    } else {
      this.open = false;
      this.result = { Data: [], Total: 0 };
      this.close.emit(null);
    }
  }

  openSearch() {
    this.open = true;
    this.searchInput.first.nativeElement.focus();
    window.scrollBy(0, 1); // 讓鍵盤出現時頁面不會被推上去
  }

  search(q) {
    this.videoService.search(q)
        .subscribe(res => this.result = res);
  }

  ngAfterViewInit(){
    const elem = this.searchInput.first.nativeElement;
    const keyup = Observable.fromEvent(elem, 'keyup')
      .map((e: KeyboardEvent) => (<HTMLInputElement>e.target).value)
      .filter((text) => text.length >= 2)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((q) => this.search(q));
  }

  ngOnChanges() {
    if(this.open) {
      this.openSearch();
    }
  }
}
