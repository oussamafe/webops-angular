import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobDetailComponent } from '../jobs/job-detail/job-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  term ;
  results = null ;
  page = 1 ;
  pageSize = 3 ;
  // tslint:disable-next-line: max-line-length
  constructor(private searchSevice: CompanyService , private route: ActivatedRoute , private spinner: NgxSpinnerService , private modalService: NgbModal) { }

  ngOnInit() {

    this.spinner.show(undefined,
      {
        type: 'cube-transition'
      } );

    this.route.queryParams
      .filter(params => params.search)
      .subscribe(params => {
        this.term = params.search;
      });

      this.searchSevice.searchAll(this.term).subscribe(
        success => {this.results = success , console.log(success)},
        error => {console.log(error) ;this.spinner.hide()},
        () => {this.spinner.hide()}

      )
  }

  jobDetails(job) {
    const modalRef = this.modalService.open(JobDetailComponent , { windowClass: 'modal-mini', size: 'sm', centered: true });
    modalRef.componentInstance.job = job;
  }

}
