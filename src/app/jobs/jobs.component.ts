import { Component, OnInit } from '@angular/core';
import { RegisterCompanyService } from '../services/register-company.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobDetailComponent } from './job-detail/job-detail.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobsList = [];
  page = 1 ;
  pageSize = 3 ;
  constructor(private jobService: RegisterCompanyService , private spinner: NgxSpinnerService , private modalService: NgbModal ) { }

  ngOnInit() {
    this.spinner.show(undefined,
      {
        type: 'square-jelly-box'
      } );
    this.jobService.getAllJobs().subscribe(
      success => {this.jobsList = success.jobs ; } ,
      error => {console.log(error) ; this.spinner.hide() } ,
      () => {
        this.spinner.hide()
      }
    )
  }

  
  jobDetails(job) {
    const modalRef = this.modalService.open(JobDetailComponent , { windowClass: 'modal-mini', size: 'sm', centered: true });
    modalRef.componentInstance.job = job;
  }

}
