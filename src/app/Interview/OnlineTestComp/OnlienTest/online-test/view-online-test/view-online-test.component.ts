import { Component, OnInit } from '@angular/core';
import {OnlineTestService} from '../../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../../../models/Interview/Question';

@Component({
  selector: 'app-view-online-test',
  templateUrl: './view-online-test.component.html',
  styleUrls: ['./view-online-test.component.css']
})
export class ViewOnlineTestComponent implements OnInit {
  p = 1;
  listQuestion: any[];
  test: { id: number; date: string; state: string,  note: any} = { id: null, date: '', state: '', note: null};
  otid = this.actRoute.snapshot.params['otid'];
  px: number;
  constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.svc.getOnlineTestbyid(this.otid).subscribe(
        (data) => {
          this.test = data;
        }
    );
    this.svc.ListQuestionByTest(this.otid).subscribe(
        (data) => {
          this.listQuestion = data;
          this.px = Math.trunc(this.listQuestion.length / 10) + 1;
        }
    );
  }

}
