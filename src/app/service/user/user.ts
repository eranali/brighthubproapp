import { Injectable } from '@angular/core';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
// import {HttpClient, HttpParams } from '@angular/http';
import { Api } from '../api/api.service';
import { Plugins } from '@capacitor/core';
import { REF, TOKEN_KEY } from '../../../../config';
const { Storage } = Plugins;
// const TOKEN_KEY = 'user-token';
/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable({
  providedIn: 'root'
})
export class User {
  // tslint:disable-next-line:variable-name
  _user: any;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(public api: Api) {
    this.loadToken();
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email, password, pushid }): Observable<any> {
    /*return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
    const data = { password: pass, email: userEmail, pushid: pushId};*/


    console.log(credentials);
    /*const seq = this.api.post('login', credentials);
    seq.subscribe((res: any) => {
      console.log(res);
      return from(Storage.set({ key: TOKEN_KEY, value: res.accountid }));
      this.isAuthenticated.next(true);
    }, err => { console.error('ERROR', err); });
    return seq;*/

    const seq = this.api.post('login', credentials);
    seq.pipe(
      map((res: any) =>  res),
      switchMap(data => {
        // console.log(data);
        Storage.set({ key: REF, value: data[0].affiliate_id });
        return from(Storage.set({ key: TOKEN_KEY, value: data[0].accountid }));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    ).subscribe((res: any) => { }, err => { console.error('ERROR', err); });
    return seq;
  }
  /** logout model */
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(fname, lname, uname, userEmail, pass, pushId) {
    const data = { first_name: fname, last_name: lname, email: userEmail, password: pass, pushid: pushId };
    // console.log(data);
    const seq = this.api.post('register', data);

    seq.subscribe((res: any) => { }, err => {
      // console.error('ERROR', err);
    });

    return seq;
  }
  storeLocation(country, ip, userid) {
    const data = { country, ip, userid };
    // console.log(data);
    const seq = this.api.post('location', data);
    seq.subscribe((res: any) => { }, err => { console.error('ERROR', err); });
    return seq;
  }
  /**
   * Log the user out, which forgets the session
   */

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }

  doreset(em) {

    const data = { email: em };
    // console.log(data);
    const seq = this.api.post('resetpassword', data);
    seq.subscribe((res: any) => { }, err => {
      console.error('ERROR', err);
    });

    return seq;

  }

}
