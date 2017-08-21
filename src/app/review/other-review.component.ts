import { Component, OnChanges, OnInit, Input, SimpleChanges } from '@angular/core';
import { ReviewService } from './review.service';
import { OtherReviews } from './review';

@Component({
  selector: 'app-other-review',
  templateUrl: './other-review.component.html',
  styleUrls: ['./review.component.scss'],
  providers: [ReviewService]
})
export class OtherReviewComponent implements OnChanges {

  @Input() userId: number;
  otherReviews: OtherReviews = {
    Reviews: [],
    Total: 0
  };

  constructor(private reviewService: ReviewService) { }

  getByUserId(userId: number) {
    this.reviewService.getByUserId(userId)
        .subscribe(reviews => this.otherReviews = reviews);
  }

  ngOnChanges(changes: SimpleChanges) {
    const vm = this;
    vm.userId =  (changes.userId && changes.userId.currentValue) || vm.userId;
    vm.getByUserId(vm.userId);
  }

  ngOnInit() {
    if(!this.userId) {
      this.reviewService.getRandom()
        .subscribe(reviews => this.otherReviews.Reviews = reviews);
    }
  }
}
