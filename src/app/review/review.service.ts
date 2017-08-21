import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Review, OtherReviews } from './review';
import { ReviewSignIn } from '../shared/signin';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ReviewService {

  constructor(private http: Http, private auth: AuthService) { }

  getById(reviewId: number): Observable<Review> {
    const url = environment.apiUrl + `/api/v2/review/${reviewId}`;
    return this.http.get(url).map((res) => res.json());
  }

  getCommentsById(reviewId: number): Observable<any> {
    const url = environment.apiUrl + '/api/review/message?reviewId=' + reviewId;
    return this.auth.get(url).map((res) => res.json());
  }

  getByUserId(userId: number): Observable<OtherReviews> {
    const url = environment.apiUrl + `/api/v2/user/${userId}/review?count=3`;
    return this.http.get(url).map((res) => res.json());
  }

  getSignInById(reviewId: number): Observable<ReviewSignIn> {
    const url = environment.apiUrl + '/api/signIn/review?ids[]=' + reviewId;
    return this.auth.get(url).map((res) => res.json()[0]);
  }

  getRandom() : Observable<Review[]>{
    const url = `${environment.apiUrl}/api/v2/review/random`;
    return this.http.get(url).map((res) => res.json());
  }

  toggleLikedById(reviewId: number): Observable<number> {
    const url = environment.apiUrl + '/Story/Activating';
    const data = { 'id': reviewId, 'act': 'Like', 'obj' : 'Review' };
    return this.auth.post(url, data).map((res) => res.json());
  }

  commentedById(reviewId: number, message: string, replyId:number){
    const url = environment.apiUrl + '/api/review/message';
    const data = { 'message': message, 'replyId': replyId, 'reviewId': reviewId };
    return this.auth.post(url, data).map((res) => res);
  }

  edit(review: Review): Observable<Review> {
    const url = `${environment.apiUrl}/api/v2/review/${review.Id}`;
    const data = { 
      'VideoId': review.Video.Id, 
      'Content': review.Content,
      'Score': review.User.Score,
      'IsLiked': review.User.IsLiked,
      'ViewedOn': review.User.ViewedOn
    };
    return this.auth.post(url, data).map((res) => res.json());
  }
}
