import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { config } from '../models/config';
import { mapTo, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {

  constructor(private http: HttpClient) { }

  registerAdmin(admin): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/employee`, admin , { responseType: 'text' as 'json' })
    .pipe(
      mapTo(true),
      catchError(error => {
      return of(false);
    }));
  }
}