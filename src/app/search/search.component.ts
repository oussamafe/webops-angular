import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  term ;
  constructor(private searchSevice: CompanyService , private route: ActivatedRoute , private spinner: NgxSpinnerService) { }

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
        success => {console.log(success)},
        error => {console.log(error) ;this.spinner.hide()},
        () => {this.spinner.hide()}

      )
  }

}
