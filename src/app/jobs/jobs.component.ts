import { Component, OnInit } from '@angular/core';
import { RegisterCompanyService } from '../services/register-company.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobsList = null;
  page = 1 ;
  pageSize = 3 ;
  constructor(private jobService: RegisterCompanyService) { }

  ngOnInit() {
    this.jobService.getAllJobs().subscribe(
      success => {this.jobsList = success.jobs ; } ,
      error => {console.log(error) ; } ,
      () => {}
    )
  }

}
