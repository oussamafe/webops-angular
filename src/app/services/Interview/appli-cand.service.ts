import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Question} from '../../models/Interview/Question';
import {JobOffer} from '../../models/Interview/JobOffer';
import {Candidate} from '../../models/Interview/Candidate';
import {Application} from '../../models/Interview/Application';

@Injectable({
  providedIn: 'root'
})
export class AppliCandService {
  private URL = 'http://localhost:9080/webops-web/rest/ApplicationResources';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient, private token: AuthService) {
  }

  getJobOffer(jid) {
    return this.http.get<JobOffer>(this.URL + '/getJobOffer?jid=' + jid, this.httpOptions);
  }
  getCandidat(cid) {
    return this.http.get<Candidate>(this.URL + '/getCandidat?cid=' + cid, this.httpOptions);
  }
  ApplicationStillWait() {
    return this.http.get<Application[]>(this.URL + '/ApplicationStillWait', this.httpOptions);
  }
  ApplicationAccepted() {
    return this.http.get<Application[]>(this.URL + '/ApplicationAccepted', this.httpOptions);
  }
  ApplicationRejected() {
    return this.http.get<Application[]>(this.URL + '/ApplicationRejected', this.httpOptions);
  }
  getuserType(uid) {
    return this.http.get<any>(this.URL + '/getuserType?uid=' + uid, this.httpOptions);
  }
  // update
  acceptApplication(id) {
    return this.http.put<Application>(this.URL + '/acceptApplication' , JSON.stringify(id), this.httpOptions);
  }
  RejectApplication(id) {
    return this.http.put<Application>(this.URL + '/RejectApplication' , JSON.stringify(id), this.httpOptions);
  }
}
