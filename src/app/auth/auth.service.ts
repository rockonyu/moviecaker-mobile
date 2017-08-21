// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: '29186407',
    domain: environment.apiUrl.replace(/(http|https):\/\//ig, ''),
    responseType: 'token',
    audience: environment.apiUrl + '/api/account/userinfo',
    redirectUri: location.origin + '/callback',
    scope: 'profile'
  });
  user: any = null;
  refreshSubscription: any;

  constructor(public router: Router, public http: Http) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile().subscribe((info) => this.user = info);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    // localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public getProfile(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const url = environment.apiUrl + '/api/account/userinfo';
    return this.get(url).map((res: Response) => res.json());
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    // localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.user = null;
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public renewToken() {
    this.auth0.renewAuth({
      audience: environment.apiUrl + '/api/account/userinfo',
      redirectUri: location.origin + '/assets/silent.html',
      usePostMessage: true
    }, (err, result) => {
      if (err) {
        console.error(`Could not get a new token using silent authentication (${err.error}).`);
      } else {
        console.log(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));
    const source = Observable.of(expiresAt)
      .flatMap(expiresAt => {
        const now = Date.now();
        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if(!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }
    
  public get(url) {
    let headers = new Headers();
    if(this.isAuthenticated()) this.setAuthorizationHeader(headers, localStorage.getItem('access_token'));
    return this.http.get(url, { headers: headers });
  }

  public post(url, data) {
    let headers = new Headers();
    if(this.isAuthenticated()) this.setAuthorizationHeader(headers, localStorage.getItem('access_token'));
    return this.http.post(url, data, { headers: headers });
  }

  private setAuthorizationHeader(headers: Headers, accessToken: string) {
      headers.append('Authorization', `Bearer ${accessToken}`);
  }
}