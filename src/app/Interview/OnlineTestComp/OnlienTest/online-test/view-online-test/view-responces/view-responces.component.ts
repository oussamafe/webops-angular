import { Component, OnInit } from '@angular/core';
import {OnlineTestService} from '../../../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Responce} from '../../../../../../models/Interview/Responce';

@Component({
  selector: 'app-view-responces',
  templateUrl: './view-responces.component.html',
  styleUrls: ['./view-responces.component.css']
})
export class ViewResponcesComponent implements OnInit {
  otid = this.actRoute.snapshot.params['otid'];
  qid = this.actRoute.snapshot.params['qid'];
  constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) { }
  px: number;
  p = 1;
  quest: { estimated_Time: number; question: string; module: string } = {question: '', module: '', estimated_Time: 2};
  listResponces: Responce[];
  ngOnInit() {
    this.svc.getQuestionbyid(this.qid).subscribe(
        (data) => {
          this.quest = data;
        }
    );
    this.svc.ListResponceByQuestion(this.qid).subscribe(
        (data) => {
          this.listResponces = data;
          this.px = Math.trunc(this.listResponces.length / 10) + 1;
        }
    );
  }

}
