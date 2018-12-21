
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

export class PosInfo {
  Address: string;
  AvatarUrl: string;
  BannerUrl: string;
  Intro: string;
  NickName: string;
  PhoneNumber: string;
  PosId: string;
}

@Injectable()
export class PosService {
  constructor(private http: Http) { }
  
  getInfo(posId: string): Observable<PosInfo> {
    const url = `${environment.apiUrl}/api/user?posId=${posId}`;
    return this.http.get(url).pipe(map((res: Response) => res.json()));
  }
}
