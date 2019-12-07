import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {Candidate} from '../models/Candidate';
import {Location} from '@angular/common';
import {FriendsService} from '../services/friends.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm: FormGroup;
  FriendsRequest: Candidate  [] = [];
  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private friend: FriendsService) {

  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.authService.login(this.f.username.value , this.f.password.value)
    .subscribe(success => {
      if (success) {

        this.router.navigate(['/home']);
        this.getCandidates();
      }
    });
  }
  getCandidates() {

    this.friend.getFriendsRequest().subscribe((data) => {
      this.FriendsRequest = data;


    }); }

}
