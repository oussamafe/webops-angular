import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { config } from '../models/config';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyInfo(): Observable<any> {
    return this.http.get<any>(`${config.apiUrl}/employee/show/company`);
  }

  getAdressCoodinates(adress: string): Observable<any> {
    const params = new HttpParams().set('adress', adress);
    return this.http.get<any>(`${config.apiUrl}/search/lookup/reverse`, { params });
  }

  autoCompleteSkills(name: string): Observable<any> {
    const params = new HttpParams().set('contains', name);
    return this.http.get<any>('http://api.dataatwork.org/v1/skills/autocomplete' , { params })
      .pipe(
        map(result => {
          return result.slice(0, 5)
        })
      );

  }

  autoCompleteAddress(address: string): Observable<any> {
    const params = new HttpParams()
    .set('app_id', 'BnAqyTVpTpaSvovZlYe1')
    .set('app_code', 'gy6olYoQlY8yR2M3Om1KYw')
    .set('query', address);


    return this.http.get('/api?maxresults=5' , {params} )
      .pipe(
        map( (data: any) => data.suggestions ));
  }


  addJobOffer(form , skills) {

    form.skills = skills ;
    return this.http.post(`${config.apiUrl}/joboffers` , form ).pipe(
      map(result => result),
      catchError( error =>  {
        return throwError(error.status)  ;
      }))
  }

  addEvent(form , skills , date) {

    form.skills = skills ;
    form.date = date ;
    return this.http.post(`${config.apiUrl}/events` , form ).pipe(
      map(result => result),
      catchError( error =>  {
        return throwError(error.status)  ;
      }))
  }

  deleteEvent(event) {
    return this.http.delete(`${config.apiUrl}/events/remove/${event}` , {responseType: 'text'} ).pipe(
      map(result => { result  }),
      catchError( error => {
        return throwError(error.status) 
      })
    )
  }
}
