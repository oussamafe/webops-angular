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
import { EditEventComponent } from './job/edit-event/edit-event.component';


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
  spinnerEvent = 'event';
  edit = false;
  eventEdits = null;

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

  deleteEvent(event) {
    this.spinner.show('event');
    this.companyService.deleteEvent(event.id).subscribe(
      result => { console.log(result) } ,
      error => {this.spinner.hide('event');} ,
      () => {
        const index: number = this.loggedCompany.events.indexOf(event);
        if (index !== -1) {
          console.log(this.loggedCompany.events[index])
            this.loggedCompany.events.splice(index, 1);
        }
        this.spinner.hide('event');
       }
    )
  }

  deleteJob() {

  }

  editEvent(event) {
    const modalRef = this.modalService.open(EditEventComponent , { windowClass: 'modal-mini', size: 'sm', centered: true });
    modalRef.componentInstance.event = event;
  }



}
