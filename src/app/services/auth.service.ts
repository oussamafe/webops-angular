import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../models/config';
import { Tokens } from '../models/tokens';
import {JwtToken} from './token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const body = new HttpParams()
    .set('username', username)
    .set('password', password);
    return this.http.post<any>(`${config.apiUrl}/login`, body.toString(), {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
      .pipe(
        tap(tokens => this.doLoginUser(username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(`${config.apiUrl}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {

    const body = new HttpParams().set('refresh_token' , this.getRefreshToken());
    return this.http.post<any>(`${config.apiUrl}/login/refresh`, body , this.httpOptions ).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.access_token);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }


  private getJwtTokens(): JwtToken {
    const decodedJwtJsonData = window.atob(this.getRefreshToken().split('.')[1]);
   // console.log('jwtoken: ' + decodedJwtJsonData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData) as JwtToken;

    decodedJwtData.exp = decodedJwtData.exp * 1000;
    decodedJwtData.iat = decodedJwtData.iat * 1000;
   // console.log('decoded jwtoken: ' + decodedJwtData.Role);
    return decodedJwtData;
  }
  roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: string[] = this.getJwtTokens().Role;
   // console.log('user role: ' + userRoles + allowedRoles);
    allowedRoles.forEach(element => {
       //   console.log('elements : ' + element + allowedRoles);
          if (userRoles.indexOf(element) > -1) {
            isMatch = true;

            return false;
          }
        }
    );
    return isMatch;

  }
  public isAdmin(): boolean {
    return this.isLoggedIn() && this.roleMatch(['Administrator']);
  }
  getUserID(): string {
    const idu: string = this.getJwtTokens().sub;
    return idu;
  }
}
