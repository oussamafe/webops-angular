import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';


@Injectable({
    providedIn: 'root'
})
export class InterviewStatisticalService {

    private URL = 'http://localhost:9080/webops-web/rest/InterviewStatisticalResources';
    //
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    //
    constructor(private http: HttpClient, private token: AuthService) {
    }


    AcceptedInterviewPerYear(year) {
        return this.http.get<any[]>(this.URL + '/AcceptedInterviewPerYear?year=' + year, this.httpOptions);
    }

    RejectedInterviewPerYear(year) {
        return this.http.get<any[]>(this.URL + '/RejectedInterviewPerYear?year=' + year, this.httpOptions);
    }

    NbInterviewPerYear(year) {
        return this.http.get<any[]>(this.URL + '/NbInterviewPerYear?year=' + year, this.httpOptions);
    }

    NbInterviewPerMonth(year, month) {
        return this.http.get<any[]>(this.URL + '/NbInterviewPerMonth?year=' + year + '&month=' + month, this.httpOptions);
    }

    AcceptedInterviewPerMonth(year, month) {
        return this.http.get<any[]>(this.URL + '/AcceptedInterviewPerMonth?year=' + year + '&month=' + month, this.httpOptions);
    }

    RejectedInterviewPerMonth(year, month) {
        return this.http.get<any[]>(this.URL + '/RejectedInterviewPerMonth?year=' + year + '&month=' + month, this.httpOptions);
    }
}
