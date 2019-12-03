import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterCompanyService } from '../services/register-company.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    
    employeeForm: FormGroup;
    formActive = false ;
    focus;
    focus1;
    focus2;
    focus3;
    success = false;
    // tslint:disable-next-line: max-line-length
    constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private registerService: RegisterCompanyService, private router: Router) { }

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            first_Name: ['' , [Validators.required , Validators.pattern('[a-zA-Z ]*')] ],
            last_Name: ['' , [Validators.required , Validators.pattern('[a-zA-Z ]*')] ],
            email: ['' , [Validators.required , Validators.email]],
            password: ['' , [Validators.required , Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
            role: ['Administrator'],
        });
    }

    get formEmployee() { return this.employeeForm.controls; }

    registerAdmin() {
        this.registerService.registerAdmin(this.employeeForm.value)
        .subscribe( success => {
            console.log(success);
                if (success) {
                    this.success = success ;
                    this.employeeForm.reset();
                } else {

                }
            });
    }

    changeForm(state) {
        this.formActive = state;
    }
}