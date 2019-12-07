import { Component, OnInit } from '@angular/core';
import {ProfessionalExperience} from '../models/ProfessionalExperience';
import {Candidate} from '../models/Candidate';
import {CandidateService} from '../services/candidate.service';
import {CVService} from '../services/cv.service';
import {AuthService} from '../services/auth.service';
import {FriendsService} from '../services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  Candidates: Candidate [] = [] ;



  constructor(public auto: AuthService, public candidateService: CandidateService, public friendS: FriendsService) { }

  ngOnInit() {}
  getCandidates(str) {
    if (str.length !== 0) {
    this.candidateService.getAllCandidate(str).subscribe((data) => {
      this.Candidates = data;
      console.log(this.Candidates);
    }); } else {
      this.Candidates = null ;
    }
  }

  SendFriendRequest(idReciever) {this.friendS.SendFriendsRequest(this.auto.getUserID(), idReciever).subscribe(success => {
    if (success) {
     document.getElementById('Send').hidden = true ;
    }});
  }
}
