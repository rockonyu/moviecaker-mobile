import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosService, PosInfo } from './pos.service';
import { VideoService, } from '../video/video.service';
import { Video, Category } from '../video/video';
import { Title } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: [
    './pos.component.scss',
    '../../../node_modules/bootstrap-grid/dist/grid.min.css'
  ],
  providers: [PosService, VideoService]
})
export class PosComponent implements OnInit {
  posInfo: PosInfo;
  videos: Video[];
  categories: Category[] = [];
  orders = [
    { text: '最新', value: 'new' },
    { text: '热门', value: 'hot' },
    { text: '好评', value: 'score' }
  ];
  selectedCategory = '';
  selectedOrder = '';
  posId = '';
  blurScreen = true;
  page = 1;
  isLoading = false;
  isEnd = false;
  sub: any;

  constructor(
    private posService: PosService,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title) {
    document.body.style.backgroundColor = 'white';
    Observable.fromEvent(window, 'scroll')
      .debounceTime(20)
      .subscribe((event) => this.checkNeedLoadMore());
  }

  getInfo(posId: string) {
    this.posService
        .getInfo(posId)
        .subscribe(info => {
          this.posInfo = info;
          this.setTitle(this.titleService.getTitle() + ' - ' + info.NickName);
        });
  }

  getCategories() {
    this.videoService
        .getCategories()
        .subscribe(categories => this.categories = categories);
  }

  changeCategory(category: string) {
    this.router.navigate(['/pos', this.posId, this.selectedOrder, category]);
  }

  getVideos(posId: string, order: string, category = '') {
     const videos = sessionStorage.getItem('videos');
     const position = sessionStorage.getItem('position');
     const page = sessionStorage.getItem('page');
     if (videos && position && page) {
      this.videos = JSON.parse(videos);
      this.blurScreen = false;
      setTimeout(() => window.scrollTo(0, +position), 0);
      this.page = +page;
      sessionStorage.clear();
    } else {
      this.videoService
        .getByPosId(posId, order, category)
        .subscribe(res => {
          this.videos = res;
          this.blurScreen = false;
        });
    }
  }

  loadMore() {
    this.isLoading = true;
    this.page++;
    this.videoService
        .getByPosId(this.posId, this.selectedOrder, this.selectedCategory, this.page)
        .subscribe(videos => {
          this.isEnd = videos.length === 0 ? true : false;
          videos.forEach(video => this.videos.push(video));
          this.isLoading = false;
      });
  }

  goToVideo(videoId: string) {
    sessionStorage.setItem('videos', JSON.stringify(this.videos));
    sessionStorage.setItem('position', window.pageYOffset.toString());
    sessionStorage.setItem('page', this.page.toString());
    this.router.navigate(['/pos/video', videoId]);
  }

  backToTop() {
    window.scrollTo(0, 0);
  }

  checkNeedLoadMore() {
    if (!this.isLoading && !this.isEnd && (document.body.scrollHeight - window.screen.availHeight - document.body.scrollTop) < 1000) {
      this.loadMore();
    }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.getCategories();
    this.sub = this.route.params.subscribe(params => {
      if (params['posId']) {
        this.posId = params['posId'];
        this.selectedCategory = params['category'] || '';
        switch (params['order']) {
          case 'score':
            this.selectedOrder = this.orders[2].value;
            this.setTitle(this.orders[2].text + '片单');
          break;
          case 'hot':
            this.selectedOrder = this.orders[1].value;
            this.setTitle(this.orders[1].text + '片单');
          break;
          case 'new':
          default:
            this.selectedOrder = this.orders[0].value;
            this.setTitle(this.orders[0].text + '片单');
          break;
        }
        this.getInfo(this.posId);
        this.getVideos(this.posId, this.selectedOrder, this.selectedCategory);
      }
    });
  }

  OnDestroy() {
    this.sub.unsubscribe();
  }
}
