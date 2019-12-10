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

  editEvent(event , date , skills , id) {
    event.date = date ;
    event.skills = skills ;
    return this.http.put(`${config.apiUrl}/events/edit/${id}` , event , {responseType: 'text'}).pipe(
      map(result => result),
      catchError( error => {
        return throwError(error);
      })
    )
  }

  deleteJob(job) {
    return this.http.delete(`${config.apiUrl}/joboffers/remove/${job}` , {responseType: 'text'} ).pipe(
      map(result => { result  }),
      catchError( error => {
        return throwError(error.status)
      })
    )
  }

  editJob(event , skills , id) {
    event.skills = skills ;
    return this.http.put(`${config.apiUrl}/joboffers/edit/${id}` , event , {responseType: 'text'}).pipe(
      map(result => result),
      catchError( error => {
        return throwError(error);
      })
    )
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${config.apiUrl}/joboffers/jobs/all`).pipe(
      map(result => result),
      catchError(error => {
        return error.status;
      })
    )
  }

  searchAll(term): Observable<any> {
    const params = new HttpParams()
    .set('by', term);

    return this.http.get<any>(`${config.apiUrl}/search` , { params }).pipe(
      map(result => result),
      catchError(error => {
        return error.status;
      })
    )
  }
}
