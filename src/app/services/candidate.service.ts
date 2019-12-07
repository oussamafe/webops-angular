import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Candidate} from '../models/Candidate';
import {config} from '../models/config';
import {Skill} from '../models/Skill';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',


    })
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      console.error('An error occurred:', error.message);
      console.error('An error occurred:', error.headers);
      console.error('An error occurred:', error.url);
      console.log('ERRRR ENDS HERE CLIENT SIDED');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`,
          `MSG was: ${error.headers}`,
          `Error is :${error.message}`);
      throwError(error);
    }
    // return an observable with a user-facing error message
    return throwError(
        error);
  }
  createCandidate(candidate): Observable<Candidate> {

    return this.http.post<Candidate>(`${config.apiUrl}/Candidate`, JSON.stringify(candidate),  this.httpOptions
    ).pipe(
        catchError(this.handleError)

    );
  }


  getCandidate(idC): Observable<Candidate> {
    return this.http.get<Candidate>(`${config.apiUrl}/Candidate/profileCandidate?idC=` + idC, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }
  updateCandidate(candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${config.apiUrl}/Candidate/updateCandidate`, JSON.stringify(candidate), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }
  getAllCandidate(str): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${config.apiUrl}/Candidate/RechercheCantact?Search=`+str, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }
  getStatCandidate(): Observable<number[]> {
    return this.http.get<number[]>(`${config.apiUrl}/StatCandidate/StatApplication`, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }

}
