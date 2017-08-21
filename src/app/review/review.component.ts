import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReviewService } from './review.service';
import { Review } from './review';
import { ReviewSignIn } from '../shared/signin';
import { VideoService } from '../video/video.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  providers: [
    ReviewService, 
    VideoService, 
    UserService,
    DatePipe
  ]
})
export class ReviewComponent implements OnInit {
  review: Review;
  signIn: ReviewSignIn;
  onlineLinks: any[] = [];
  openShare = false;
  friendship;
  isEdit = false;
  editReview;
  currentDate;
  sub: any;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private titleService: Title,
    private videoService: VideoService,
    private auth: AuthService,
    private userService: UserService,
    private datePipe: DatePipe
  ) {
    this.currentDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  getReview(reviewId: number) {
    const vm = this;
    vm.reviewService.getById(reviewId).subscribe(review => {
      vm.review = review;
      vm.editReview = JSON.parse(JSON.stringify(review));
      vm.review.Video.PosterUrl += '?width=400&height=600&stretch=fill';
      vm.titleService.setTitle(review.Video.CNName);
      vm.getSignIn(reviewId);
      vm.getOnlineLinks(review.Video.Id);
    });
  }

  getSignIn(reviewId: number) {
    this.reviewService.getSignInById(reviewId)
        .subscribe(sign => this.signIn = sign);
  }

  getOnlineLinks(videoId: string) {
    this.videoService.getOnlineLinksById(videoId)
        .subscribe(videos => this.onlineLinks = videos);
  }

  toggleLiked() {
    const vm = this;
    if (vm.auth.isAuthenticated()) {
      vm.reviewService.toggleLikedById(vm.review.Id)
        .subscribe(res => {
          vm.signIn.IsLiked = !vm.signIn.IsLiked;
          vm.signIn.LikedNum += res;
        });
    } else {
      vm.auth.login();
    }
  }

  closeShare() { this.openShare = false; }

  save() {
    const vm = this;
    vm.reviewService.edit(vm.editReview).subscribe(res => { 
        vm.review = res;
        vm.isEdit = false;
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['reviewId']) {
        this.getReview(params['reviewId']);
        window.scrollTo(0, 0);
      }
    });
  }

  OnDestroy() {
    this.sub.unsubscribe();
  }
}
