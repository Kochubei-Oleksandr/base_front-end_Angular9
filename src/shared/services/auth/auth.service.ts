import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../../models/user.class';
import {catchError, map} from 'rxjs/operators';
import {IAuth} from '../../../components/auth/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  register(user: User) {
    return this
      .sendPost(this.getEndpoint('register'), user)
      .pipe(
        map((res: IAuth) => this.setToken(res.token)),
        catchError((err) => this.onError(err))
      );
  }
  login(user: User) {
    return this
      .sendPost(this.getEndpoint('login'), user)
      .pipe(
        map((res: IAuth) => this.setToken(res.token)),
        catchError((err) => this.onError(err))
      );
  }
  setToken(token): void {
    localStorage.setItem('token', token);
  }
  static getToken(): string {
    return localStorage.getItem('token');
  }
  static isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  doLogout():void {
    let removeToken = localStorage.removeItem('token');
    if (removeToken === null) {
      this._router.navigate(['/']);
    }
  }
}