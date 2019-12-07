import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Course} from '../models/Course';
import {config} from '../models/config';
import {catchError, retry} from 'rxjs/operators';
import {Friend} from '../models/Friend';
import {Candidate} from '../models/Candidate';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {



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
  SendFriendsRequest(idSender, idReciever): Observable<Friend> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<Friend>(`${config.apiUrl}/Contacts/SendFriendRequest?idSender=` + idSender + `&idReciever=` + idReciever,this.httpOptions
    ).pipe(
        catchError(this.handleError)

    );
  }

  getFriendsRequest(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${config.apiUrl}/Contacts/AllMyFriendsRequests`, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }

  AcceptFriendsRequest(idSender, idReciever): Observable<Friend> {
    return this.http.put<Friend>(`${config.apiUrl}/Contacts/TraiteFriendRequest/Accept?idSender=` + idSender + `&idReciever=` + idReciever, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }
  RejectFriendsRequest(idSender, idReciever): Observable<Friend> {
    return this.http.delete<Friend>(`${config.apiUrl}/Contacts/TraiteFriendRequest/Refuse?idSender=` + idSender + `&idReciever=` + idReciever, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }
  follow(idCand, idSub): Observable<Candidate> {
    return this.http.put<Candidate>(`${config.apiUrl}/Contacts/CandidateSub?idCand=` + idCand + `&idSub=` + idSub, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
}
  unfollow(idCand, idSub): Observable<Candidate> {
    return this.http.put<Candidate>(`${config.apiUrl}/Contacts/CandidateRemoveSub?idCand=` + idCand + `&idSub=` + idSub, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }
  getAllMySubscribers(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${config.apiUrl}/Contacts/AllMyFriendsRequests`, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }
  getMySubSribtions(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${config.apiUrl}/Contacts/AllMyFriendsRequests`, this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }



}
