import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../models/config';
import { tap, map } from 'rxjs/operators';

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

  autoCompleteAddress(address:string) : Observable<any> {
    const params = new HttpParams().set('query', address).set('app_id', 'BnAqyTVpTpaSvovZlYe1').set('app_code', 'gy6olYoQlY8yR2M3Om1KYw');
    return this.http.get<any>('http://autocomplete.geocoder.api.here.com/6.2/suggest.json?maxresults=5' , { params })
      .pipe(tap(result => result) );
  }
}
