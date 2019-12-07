import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  loggedCompany = null;
  closeResult: string;
  focus = false;
  focus1 = true ;
  focus2 = false;
  focus3 = false;
  focus4 = false;
  focus5 = false;
  isLoading = false;
  eventForm: FormGroup;
  employeeForm: FormGroup;

  model: any;


  // tslint:disable-next-line: max-line-length
  constructor(private spinner: NgxSpinnerService , private companyService: CompanyService, private authService: AuthService, private router: Router, private modalService: NgbModal , private formBuilder: FormBuilder) {
    this.companyService.getCompanyInfo().subscribe(
      data => { this.loggedCompany = data; }
    );
  }


  ngOnInit() {
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  addJob() {
  }



}
