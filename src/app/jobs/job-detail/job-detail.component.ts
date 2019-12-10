import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() public job;
  constructor() { }

  ngOnInit() {
    console.log(this.job);
  }

}
