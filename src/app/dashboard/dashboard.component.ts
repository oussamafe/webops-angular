import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CandidateService} from '../services/candidate.service';
import * as CanvasJS from './canvasjs.min';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Stat: number[] = [];
  constructor(private Actrouter: ActivatedRoute, private http: HttpClient, public candidateService: CandidateService) {}



  ngOnInit() {
    this.candidateService.getStatCandidate().subscribe((data) => {
      this.Stat = data;
      console.log(this.Stat);
      const chart = new CanvasJS.Chart('chartContainer', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Your applications Stat'
        },
        data: [{
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: [
            {y: this.Stat[0], name: 'ApplicationDonebyCandidate'},
            {y: this.Stat[1], name: 'ApplicationAcceptedbyCandidate'},
            {y: this.Stat[2], name: 'ApplicationRefusedbyCandidate'},
            {y: this.Stat[3], name: 'ApplicationWaitingReplybyCandidate'},

          ]
        }]
      });

      chart.render();


    });

  }

}
