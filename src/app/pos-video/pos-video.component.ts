import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video/video.service';
import { Video } from '../video/video';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pos-video',
  templateUrl: './pos-video.component.html',
  styleUrls: [
    '../pos/pos.component.scss',
    '../../../node_modules/bootstrap-grid/dist/grid.min.css'
  ],
  providers: [VideoService]
})
export class PosVideoComponent implements OnInit {
  video: Video;
  sub: any;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private http: Http,
    private titleService: Title
  ) { 
    document.body.style.backgroundColor = 'white';
  }

  goBack() {
    window.history.back();
  }

  getVideo(videoId: string) {
    this.videoService.getById(videoId).subscribe(video => {
      const vm = this;
      vm.video = video;
      vm.video.PosterUrl = `${vm.video.PosterUrl}?width=200&height=300&stretch=fill`;
      vm.video.BannerUrl = `${vm.video.BannerUrl}?width=400&height=150&stretch=fill`;
      this.setTitle(video.CNName + ' ' + video.ENName + ' (' + new Date(video.ReleaseDate).getFullYear() + ')');
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['videoId']) {
        this.getVideo(params['videoId']);
      }
    });
  }

  OnDestroy() {
    this.sub.unsubscribe();
  }
}
