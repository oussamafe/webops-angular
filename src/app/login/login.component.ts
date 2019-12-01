import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm: FormGroup;
  errorLogin = null;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.errorLogin = null;
    this.authService.login(this.f.username.value , this.f.password.value)
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


}
