import { Component, OnInit } from '@angular/core';
import { RegisterCompanyService } from '../services/register-company.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { LocationLookupService } from '../services/location-lookup.service';
import * as mapBoxGl from 'mapbox-gl';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobsList = [];
  page = 1 ;
  pageSize = 3 ;
  center = null ;
  jobsMap = null ;
  zoom = [3];
  // tslint:disable-next-line: max-line-length
  constructor(private jobService: RegisterCompanyService , private spinner: NgxSpinnerService , private modalService: NgbModal , private locationService: LocationLookupService ) { }

  ngOnInit() {
    mapBoxGl.setRTLTextPlugin('../assets/RtlMapbox.js', () => {});
    this.locationService.getCurrentPosition().subscribe(
      // tslint:disable-next-line: max-line-length
      result => {this.center = [result.coords.longitude , result.coords.latitude] }  ,
      error => {console.log(error)}
    );
    this.spinner.show(undefined,
      {
        type: 'square-jelly-box'
      } );
    this.jobService.getAllJobs().subscribe(
      success => {this.jobsList = success.jobs ; } ,
      error => {console.log(error) ; this.spinner.hide()} ,
      () => {
        this.spinner.hide()
      }
    )
  }

  
  jobDetails(job) {
    const modalRef = this.modalService.open(JobDetailComponent , { windowClass: 'modal-mini', size: 'sm', centered: true });
    modalRef.componentInstance.job = job;
  }

  getJobsByDistance(distance) {
    this.locationService.getJobsByLocation(this.center , distance.value).subscribe(
      success => { this.jobsMap = success ; },
      error => { console.log(error)},
      () => {
        this.jobsMap.forEach(element => {
          let coord = element.location.split(',');
          element.location = {lng: coord[1], lat: coord[0]}
        });
      }
    )
  }

}
