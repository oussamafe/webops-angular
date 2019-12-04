import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Availability} from '../../models/Interview/Availability';

@Injectable({
    providedIn: 'root'
})
export class AvailabilityService {
    private URL = 'http://localhost:9080/webops-web/rest/AvailabilityResources';
    //
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    //
    constructor(private http: HttpClient, private token: AuthService) {
    }

    //
    // add
    InitialiseCandidateAvailability(cid) {
        return this.http.post(this.URL + '/InitialiseCandidateAvailability?cid=' + cid, this.httpOptions);
    }

    InitialiseEmployeAvailability(eid) {
        return this.http.post(this.URL + '/InitialiseEmployeAvailability?eid=' + eid, this.httpOptions);
    }

    // affect / unaffect
    SetAvailibleCandidate(cid, dateav, heurdeb) {
      // tslint:disable-next-line:max-line-length
        return this.http.put(this.URL + '/SetAvailibleCandidate?cid=' + cid + '&dateav=' + dateav + '&heurdeb=' + heurdeb, this.httpOptions);
    }

    SetAvailibleEmploye(eid, dateav, heurdeb) {
        return this.http.put(this.URL + '/SetAvailibleEmploye?eid=' + eid + '&dateav=' + dateav + '&heurdeb=' + heurdeb, this.httpOptions);
    }

    SetNoAvailibleCandidate(cid, dateav, heurdeb) {
      // tslint:disable-next-line:max-line-length
        return this.http.put(this.URL + '/SetNoAvailibleCandidate?cid=' + cid + '&dateav=' + dateav + '&heurdeb=' + heurdeb, this.httpOptions);
    }

    SetNoAvailibleEmploye(eid, dateav, heurdeb) {
      // tslint:disable-next-line:max-line-length
        return this.http.put(this.URL + '/SetNoAvailibleEmploye?eid=' + eid + '&dateav=' + dateav + '&heurdeb=' + heurdeb, this.httpOptions);
    }


    // get
    ListAvailabilityCandidate(cid) {
        return this.http.get<Availability[]>(this.URL + '/ListAvailabilityCandidate?cid=' + cid, this.httpOptions);
    }

    ListAvailabilityEmploye(eid) {
        return this.http.get<Availability[]>(this.URL + '/ListAvailabilityEmploye?eid=' + eid, this.httpOptions);
    }

  OneAvailabilityCandidate(cid, date, starthour) {
      // tslint:disable-next-line:max-line-length
        return this.http.get<Availability>(this.URL + '/OneAvailabilityCandidate?cid=' + cid + '&date=' + date + '&starthour=' + starthour, this.httpOptions);
    }
  OneAvailabilityEmploye(eid, date, starthour) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Availability>(this.URL + '/OneAvailabilityEmploye?eid=' + eid + '&date=' + date + '&starthour=' + starthour, this.httpOptions);
  }
}
