import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Video, Category } from './video';
@Injectable()
export class VideoService {

  constructor(private http: Http) { }

  getOnlineLinksById(videoId: string): Observable<any[]> {
    const url = environment.apiUrl + `/api/video/links?id=${videoId}`;
    return this.http.get(url).map((res: Response) => res.json());
  }

  getByPosId(posId: string, order = 'hot', category = '', page: number = 1): Observable<Video[]> {
    const url = `${environment.apiUrl}/api/v2/video?limit=20&posId=${posId}&order=${order}&category=${category}&page=${page}`;
    return this.http.get(url).map((res: Response) => res.json());
  }

  getById(videoId: string): Observable<Video> {
    const url = environment.apiUrl + '/api/v2/video/' + videoId;
    return this.http.get(url).map((res: Response) => res.json());
  }

  getCategories(): Observable<Category[]> {
    const options = new RequestOptions({ headers: new Headers({ 'Accept-Language': 'zh-CN' }) });
    const url = environment.apiUrl + '/api/v2/video/categories';
    return this.http.get(url, options).map((res: Response) => res.json());
  }

  search(q: string): Observable<any> {
    const url = `${environment.apiUrl}/api/search?term=${q}`;
    return this.http.get(url).map((res: Response) => res.json());
  }
}
