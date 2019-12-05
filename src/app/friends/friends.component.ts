import { Component, OnInit } from '@angular/core';
import {ProfessionalExperience} from '../models/ProfessionalExperience';
import {Candidate} from '../models/Candidate';
import {CandidateService} from '../services/candidate.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  Candidates: Candidate [] = [] ;

  constructor( public candidateService: CandidateService) { }

  ngOnInit() {
  }
  getCandidates(str) {
    if (str.length !== 0) {
    this.candidateService.getAllCandidate(str).subscribe((data) => {
      this.Candidates = data;
      console.log(this.Candidates);
    }); } else {
      this.Candidates = null ;
    }
  }

  SendFriendRequest() {
  }
}
