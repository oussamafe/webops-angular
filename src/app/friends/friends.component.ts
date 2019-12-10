import { Component, OnInit } from '@angular/core';
import {ProfessionalExperience} from '../models/ProfessionalExperience';
import {Candidate} from '../models/Candidate';
import {CandidateService} from '../services/candidate.service';
import {CVService} from '../services/cv.service';
import {AuthService} from '../services/auth.service';
import {FriendsService} from '../services/friends.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  Candidates: Candidate [] = [] ;



  constructor( private router: Router, public auto: AuthService, public candidateService: CandidateService, public friendS: FriendsService, private modalService: NgbModal) { }

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

  SendFriendRequest(pop , idReciever) {
    this.friendS.SendFriendsRequest(this.auto.getUserID(), idReciever).subscribe();
     this.modalService.open(pop, { size: 'sm' });

  }

  close() {
    this.modalService.dismissAll();
    this.router.navigate(['home']);
  }
}
