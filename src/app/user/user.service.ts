import { Injectable } from '@angular/core';
import { AuthService } from "app/auth/auth.service";
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";

@Injectable()
export class UserService {

  constructor(private auth: AuthService) { }

  check(userId: number): Observable<any> {
    const url = `${ environment.apiUrl }/Data/GetFriendship`;
    const data = { userIds: JSON.stringify([userId]) };
    return this.auth.post(url, data).map((res) => res.json()[0]);
  }

  invite(userId: number): Observable<any> {
    const url = `${ environment.apiUrl }/api/Inviting/Invite/${userId}`;
    return this.auth.post(url, null).map((res) => res.json().Data);
  }

  cancel(userId: number): Observable<any> {
    const url = `${ environment.apiUrl }/api/Inviting/Cancel/${userId}`;
    return this.auth.post(url, null).map((res) => res.json().Data);
  }

  accept(userId: number): Observable<any> {
    const url = `${ environment.apiUrl }/api/Inviting/Accept/${userId}`;
    return this.auth.post(url, null).map((res) => res.json().Data);
  }

  reject(userId: number): Observable<any> {
    const url = `${ environment.apiUrl }/api/Inviting/Reject/${userId}`;
    return this.auth.post(url, null).map((res) => res.json().Data);
  }
}
