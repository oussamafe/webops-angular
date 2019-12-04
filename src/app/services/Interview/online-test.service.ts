import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Question} from '../../models/Interview/Question';
import {AuthService} from '../auth.service';
import {OnlineTest} from '../../models/Interview/OnlineTest';
import {Responce} from '../../models/Interview/Responce';
@Injectable({
  providedIn: 'root'
})
export class OnlineTestService {
  private URL = 'http://localhost:9080/webops-web/rest/OnlineTestResources';
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
  addQuestion(question) {
    return this.http.post<any>(this.URL + '/addTestQuestion', JSON.stringify(question), this.httpOptions);
  }
  addOnlineTest() {
    return this.http.post<any>(this.URL + '/AddOnlineTest', this.httpOptions);
  }

  // affect  /  unaffect
  addAndAffectResponce(qid, responce) {
    return this.http.put(this.URL + '/AddRepAndAffectToQuestion?qid=' + qid, JSON.stringify(responce), this.httpOptions);
  }
  affectTestToAnCandidate(CandidateID, TestID) {
    return this.http.put(this.URL + '/affectCandidateTest?cid=' + CandidateID + '&otid=' + TestID , this.httpOptions);
  }
  AffectQuestionToAnOnlineTest(TestID, QuestionID) {
    return this.http.put(this.URL + '/affectQuestionTest?otid=' + TestID + '&qid=' + QuestionID, this.httpOptions);
  }
  UnAffectTestQuestion(otid, qid) {
    return this.http.put(this.URL + '/UnAffectTestQuestion?otid=' + otid + '&qid=' + qid, this.httpOptions);
  }
  affectAutoQuestionToTestByModule(module, NbQuestion, otid) {
    // tslint:disable-next-line:max-line-length
    return this.http.put(this.URL + '/affectAutoQuestionToTestByModule?module=' + module + '&NbQuestion=' + NbQuestion + '&otid=' + otid, this.httpOptions);
  }







  // update
  UpdateQuestion(id, question) {
    return this.http.put<Question>(this.URL + '/updateQuestion?qid=' + id, JSON.stringify(question), this.httpOptions);
  }
  UpdateResponce(rid, responce) {
    return this.http.put<Responce>(this.URL + '/updateResponce?rid=' + rid, JSON.stringify(responce), this.httpOptions);
  }
  setTestResult(otid) {
    return this.http.put<OnlineTest>(this.URL + '/setTestResult?otid=' + otid, this.httpOptions);
  }
  setTestNoteByQuestion(otid, qid, jo) {
    return this.http.put(this.URL + '/setTestNoteByQuestion?otid=' + otid + '&qid=' + qid, jo , this.httpOptions);
  }
  setResponceInValid(rid) {
    return this.http.put<OnlineTest>(this.URL + '/setResponceInValid?rid=' + rid, this.httpOptions);
  }
  setResponceValid(rid) {
    return this.http.put<OnlineTest>(this.URL + '/setResponceValid?rid=' + rid, this.httpOptions);
  }

  // delete
  DeleteResponce(rid) {
    return this.http.delete<Question>(this.URL + '/RemoveResponce?rid=' +  rid, this.httpOptions);
  }
  DeleteTest(otid) {
    return this.http.delete<Question>(this.URL + '/RemoveTestOnline?otid=' +  otid, this.httpOptions);
  }
  DeleteQuestion(id) {
    return this.http.delete<Question>(this.URL + '/RemoveQuestion?qid=' +  id, this.httpOptions);
  }



  // get
  getListAllQuestion() {
    return this.http.get<Question[]>(this.URL + '/ListQuestion', this.httpOptions);
  }
  ListAlltest() {
    return this.http.get<OnlineTest[]>(this.URL + '/ListAlltest', this.httpOptions);
  }
  ListAcceptedtest() {
    return this.http.get<OnlineTest[]>(this.URL + '/ListAcceptedtest', this.httpOptions);
  }
  ListRejectedtest() {
    return this.http.get<OnlineTest[]>(this.URL + '/ListRejectedtest', this.httpOptions);
  }
  getQuestionbyid(id) {
    return this.http.get<Question>(this.URL + '/getQuestionbyid?qid=' + id, this.httpOptions);
  }

  ListQuestionNotAffectForTest(id) {
    return this.http.get<Question[]>(this.URL + '/ListQuestionNotAffectForTest?otid=' + id, this.httpOptions);
  }
  ListQuestionByModuleNotAffectForTest( otid, module) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Question[]>(this.URL + '/ListQuestionByModuleNotAffectForTest?otid=' + otid + '&module=' + module, this.httpOptions);
  }

  getOnlineTestbyid(id) {
    return this.http.get<OnlineTest>(this.URL + '/getOnlineTestbyid?otid=' + id, this.httpOptions);
  }
  getResponcebyid(id) {
    return this.http.get<Responce>(this.URL + '/getResponcebyid?rid=' + id, this.httpOptions);
  }
  getCandidateWaitFortest() {
    return this.http.get<any[]>(this.URL + '/getCandidateWaitFortest', this.httpOptions);
  }
  ListQuestionByModule(module) {
    return this.http.get<Question[]>(this.URL + '/ListQuestionByModule?module=' + module, this.httpOptions);
  }
  ListModuleOfQuestion() {
    return this.http.get<string[]>(this.URL + '/ListModuleOfQuestion', this.httpOptions);
  }

  getOnlineTestCandidate(cid) {
    return this.http.get<OnlineTest>(this.URL + '/getOnlineTestCandidate?cid=' + cid, this.httpOptions);
  }
  ListResponceByQuestion(qid) {
    return this.http.get<Responce[]>(this.URL + '/ListResponceByQuestion?qid=' + qid, this.httpOptions);
  }
  EstimatedTimeForTest(otid) {
    return this.http.get<number>(this.URL + '/EstimatedTimeForTest?otid=' + otid, this.httpOptions);
  }
  ListQuestionByTest(otid) {
    return this.http.get<Question[]>(this.URL + '/ListQuestionByTest?otid=' + otid, this.httpOptions);
  }

  GetOnlinetestResult(otid) {
    return this.http.get<string>(this.URL + '/GetOnlinetestResult?otid=' + otid, this.httpOptions);
  }
    getModulsByTest(otid) {
        return this.http.get<string[]>(this.URL + '/getModulsByTest?otid=' + otid, this.httpOptions);
    }

  getStateResponcebyId(rid) {
    return this.http.get<any>(this.URL + '/getStateResponcebyId?rid=' + rid, this.httpOptions);
  }

  serchByQuestion(question) {
    return this.http.get<Question[]>(this.URL + '/serchByQuestion?question=' + question, this.httpOptions);
  }
  serchByRespone(responce, qid) {
    return this.http.get<Responce[]>(this.URL + '/serchByRespone?responce=' + responce + '&qid=' + qid , this.httpOptions);
  }
}
