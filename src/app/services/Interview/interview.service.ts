import { Injectable } from '@angular/core';
import {AuthService} from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Interview} from '../../models/Interview/Interview';
import {InterviewType} from '../../models/Interview/InterviewType';
@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private URL = 'http://localhost:9080/webops-web/rest/InterviewResources';
  //
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token.getJwtToken()
    })
  };
  //
  constructor(private http: HttpClient, private token: AuthService) {
  }
  //
  // add
  AddInterview(cid) {
    return this.http.post<Interview>(this.URL + '/AddInterview?cid=' + cid, this.httpOptions);
  }
  AddInterviewType(interviewType) {
    return this.http.post<InterviewType>(this.URL + '/AddInterviewType', JSON.stringify(interviewType), this.httpOptions);
  }



  // update
  UpdateInterview(iid, interview) {
    return this.http.put<Interview>(this.URL + '/UpdateInterview?iid=' + iid, JSON.stringify(interview), this.httpOptions);
  }
  UpdateInterviewType(itid, interviewType) {
    return this.http.put<InterviewType>(this.URL + '/UpdateInterviewType?itid=' + itid, JSON.stringify(interviewType), this.httpOptions);
  }





  // affect / unaffect
  SetInValidInterview(iid) {
    return this.http.put(this.URL + '/SetInValidInterview?iid=' + iid, this.httpOptions);
  }
  SetValidInterview(iid) {
    return this.http.put(this.URL + '/SetValidInterview?iid=' + iid, this.httpOptions);
  }
  AffectInterviewToEmploye(iid, eid) {
    return this.http.put(this.URL + '/AffectInterviewToEmploye?iid=' + iid + '&eid=' + eid, this.httpOptions);
  }
  AffectInterviewToCandidate(iid, cid) {
    return this.http.put(this.URL + '/AffectInterviewToCandidate?iid=' + iid + '&cid=' + cid, this.httpOptions);
  }
  AffectInterviewTypeToInterview(iid, itid) {
    return this.http.put(this.URL + '/AffectInterviewToCandidate?iid=' + iid + '&itid=' + itid, this.httpOptions);
  }


// delete
  DeleteInterviewType(itid) {
    return this.http.delete<InterviewType>(this.URL + '/DeleteInterviewType?itid=' +  itid, this.httpOptions);
  }
  DeleteInterview(iid) {
    return this.http.delete<InterviewType>(this.URL + '/DeleteInterview?iid=' +  iid, this.httpOptions);
  }


  // get
  ListAllInterview() {
    return this.http.get<Interview[]>(this.URL + '/ListAllInterview', this.httpOptions);
  }
  ListInterviewByCandidate(cid) {
    return this.http.get<Interview[]>(this.URL + '/ListInterviewByCandidate?cid=' + cid, this.httpOptions);
  }
  ListInterviewByEmploye(eid) {
    return this.http.get<Interview[]>(this.URL + '/ListInterviewByEmploye?eid=' + eid, this.httpOptions);
  }
  ListInterviewPerDate(date) {
    return this.http.get<Interview[]>(this.URL + '/ListInterviewPerDate?date=' + date, this.httpOptions);
  }
  ListInterviewByType(itid) {
    return this.http.get<Interview[]>(this.URL + '/ListInterviewByType?itid=' + itid, this.httpOptions);
  }
  ListAllInterviewType() {
    return this.http.get<InterviewType[]>(this.URL + '/ListAllInterviewType', this.httpOptions);
  }

}
