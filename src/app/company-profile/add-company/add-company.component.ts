import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterCompanyService } from 'src/app/services/register-company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  focus;
  focus1 = true;
  focus2;
  focus3;
  focus4;
  classic1;
  companyForm: FormGroup;
  constructor(private formBuilder: FormBuilder , private spinner: NgxSpinnerService , private companySerivce : RegisterCompanyService) { }

  ngOnInit() {

    this.companyForm = this.formBuilder.group({
      name: [''],
      field: [''],
      email: [''],
      nbEmployees: ['']
    });
  }

  addCompany() {
    this.spinner.show(undefined,
      {
        type: 'square-jelly-box'
      } );
    this.companySerivce.registerCompany(this.companyForm.value).subscribe(
      success => {} ,
      error => {this.spinner.hide()} ,
      () => {
        this.spinner.hide()
      }
    );
  }

}
