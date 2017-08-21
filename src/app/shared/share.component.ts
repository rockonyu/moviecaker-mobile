import { Component, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { AuthService } from "app/auth/auth.service";

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnChanges {

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() open: boolean =  false;
  @Input() type: string;
  @Input() id: number;

  notice = true;
  keys = environment.apiKeys;

  CONTENT_MAX_LENGTH = 100;
  CONTENT_TITLE_MAX_LENGTH = 120;

  constructor(private http: Http, private auth: AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    const vm = this;
    vm.open = changes.open && changes.open.currentValue;
  }

  toggle() {
    this.open = !this.open;
    if (!this.open) {
      this.close.emit(null);
    }
  }

  shareTo(target) {
    const vm = this;
    let url = `${environment.apiUrl}/Story/Activating`;
    let data = { 'id': this.id, 'act': 'Share', 'obj' : this.type };
    vm.auth.post(url, data)
      .subscribe(res => {
        url = `${environment.apiUrl}/story/getShareOptions`;
        vm.http.post(url, data).map((res: Response) => res.json())
          .subscribe(res => {
            res.Title = res.Title;
            res.Content = res.Content.replace(/(\r\n|\r|\n)/g, '');
            res.Url = encodeURI(location.href);
            res.PicUrl = encodeURI(res.PicUrl);
            switch(target){
              case 'FB':
                res.Content = this.filterContent(res.Content, this.CONTENT_MAX_LENGTH);
                location.href = `https://www.facebook.com/dialog/feed?app_id=${this.keys[target]}&display=popup&link=${res.Url}&picture=${res.PicUrl}&name=${res.Title}&description=${res.Content}&redirect_uri=${res.Url}`;
              break;
              case 'WB':
                res.Content = res.Title + '：' + res.Content;
                res.Content = this.filterContent(res.Content, this.CONTENT_TITLE_MAX_LENGTH);
                location.href = `http://service.weibo.com/share/share.php?title=${res.Content}&appkey${this.keys[target]}&url=${res.Url}&pic=${res.PicUrl}`;
              break;
              case 'QQ':
                res.Content = res.Title + '：' + res.Content;
                res.Content = this.filterContent(res.Content, this.CONTENT_TITLE_MAX_LENGTH);
                location.href = `http://share.v.t.qq.com/index.php?c=share&a=index&url=${res.Url}&appkey${this.keys[target]}&pic=${res.PicUrl}&title=${res.Content}`;
              break;
              default:
              break;
            }
          });
      });
  }

  private filterContent(content: string, maxLength: number) {
    if (content.length < maxLength) {
      return content;
    } else{
      return content.substring(0, maxLength - 3) + '...';
    }
  }
}
