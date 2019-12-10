import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {Candidate} from '../models/Candidate';
import {Location} from '@angular/common';
import {FriendsService} from '../services/friends.service';

import {CandidateService} from '../services/candidate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;
  focus;
  focus1;
  loginForm: FormGroup;
  FriendsRequest: Candidate  [] = [];
  errorLogin = null;

  // tslint:disable-next-line:max-line-length
  constructor( private authServices: AuthService, private formBuilder: FormBuilder, private canser : CandidateService , private router: Router, private friend: FriendsService ) {

  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });

  }

  get f() { return this.loginForm.controls; }

  login() {
    this.errorLogin = null;
    this.authServices.login(this.f.username.value , this.f.password.value)
        .subscribe(success => {
              if (success === true) {
                this.router.navigate(['/home']);
              }
            },
            error => {
              if (error === 406 )  {
                this.errorLogin = false;
              }
              else {
                this.errorLogin = true;
              }
            }
        );
  }

  getCandidates() {

    this.friend.getFriendsRequest().subscribe((data) => {
      this.FriendsRequest = data;


    }); }

}
