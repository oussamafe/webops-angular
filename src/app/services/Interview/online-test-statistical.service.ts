import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';


@Injectable({
    providedIn: 'root'
})
export class OnlineTestStatisticalService {
    private URL = 'http://localhost:9080/webops-web/rest/OnlineTestStatisticalResources';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private token: AuthService) {
    }


  AcceptedTestPerYear(year) {
    return this.http.get<any[]>(this.URL + '/AcceptedTestPerYear?year=' + year, this.httpOptions);
  }

  RejectedTestPerYear(year) {
    return this.http.get<any[]>(this.URL + '/RejectedTestPerYear?year=' + year, this.httpOptions);
  }

  NbTestPerYear(year) {
    return this.http.get<any[]>(this.URL + '/NbTestPerYear?year=' + year, this.httpOptions);
  }

  NbTestPerMonth(year, month) {
    return this.http.get<any[]>(this.URL + '/NbTestPerMonth?year=' + year + '&month=' + month, this.httpOptions);
  }

  AcceptedTestPerMonth(year, month) {
    return this.http.get<any[]>(this.URL + '/AcceptedTestPerMonth?year=' + year + '&month=' + month, this.httpOptions);
  }

  RejectedTestPerMonth(year, month) {
    return this.http.get<any[]>(this.URL + '/RejectedTestPerMonth?year=' + year + '&month=' + month, this.httpOptions);
  }

}
