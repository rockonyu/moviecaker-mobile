import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";
import { AuthService } from "app/auth/auth.service";

@Injectable()
export class CommentService {
  constructor(private auth: AuthService) { }

  sendById(type: string, id: number, comment: string, replyId: number) {
    const url = `${ environment.apiUrl }/api/${ type }/message`;
    const data = { 'message': comment, 'replyId': replyId };
    data[type.toLowerCase() + 'Id'] = id; // ex: data['reviewId'] = id;
    return this.auth.post(url, data).map((res) => res);
  }

  getById(type:string, id: number): Observable<any> {
    const url = `${ environment.apiUrl }/api/${ type }/message?${ type }Id=${ id }`;
    return this.auth.get(url).map((res) => res.json());
  }

  toggleLikedById(type: string, commentId: number): Observable<number> {
    const url = environment.apiUrl + '/Data/LikeThisMessage';
    const data = { 'id': commentId, 'type' : type };
    return this.auth.post(url, data).map((res) => res.json());
  }
}
