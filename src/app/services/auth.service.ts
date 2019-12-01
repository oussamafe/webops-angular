import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../models/config';
import { Tokens } from '../models/tokens';
import {MatDialog} from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

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

  constructor(private http: HttpClient , public dialog: MatDialog) {}

  login(username: string, password: string): Observable<any> {
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
          return throwError(error.status);
        }));
  }

  logout() {
   /* return this.http.post<any>(`${config.apiUrl}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));*/

      return this.doLogoutUser();
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
}
