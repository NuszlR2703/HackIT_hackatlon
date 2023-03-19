import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'core/auth/models';
import { CookieService } from './cookie.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(_cookieService.getCookie('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    if (!this.currentUserSubject) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(this._cookieService.getCookie('currentUser'))
      );
    }
    return this.currentUserSubject.value;
  }

  public setUser(newUserData) {
    if (newUserData) {
      this._cookieService.setCookie(
        'currentUser',
        JSON.stringify(newUserData),
        1
      );
    }
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    let user = JSON.parse(
      this._cookieService.getCookie('currentUser')
    );
    return user && user.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    let user = JSON.parse(
      this._cookieService.getCookie('currentUser')
    );
    return user && user.role === Role.Client;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(userLogin: any) {
    return this._http.post<any>(
      environment.apiUrl + '/login-user',
      userLogin,
      { observe: 'response' }
    );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    this._cookieService.deleteCookie('currentUser');
    this.currentUserSubject.next(null);
  }

  forgotPassword(email: string) {
    return this._http.post<any>(
      environment.apiUrl + '/user/recover-password?email=' + email,
      email
    );
  }

  recoverPassword(password: string, recoveryCode: string) {
    return this._http.post<any>(
      environment.apiUrl +
        '/user/reset-password?recoveryCode=' +
        recoveryCode +
        '&password=' +
        password,
      password
    );
  }
}
