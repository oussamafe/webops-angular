import {Component, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../../models/Interview/Question';

@Component({
    selector: 'app-step-two-test',
    templateUrl: './step-two-test.component.html',
    styleUrls: ['./step-two-test.component.css']
})
export class StepTwoTestComponent implements OnInit {

    focus;
    focus1;
    time: any;
    otid = this.actRoute.snapshot.params['otid'];
    cid = this.actRoute.snapshot.params['cid'];
    p1 = 1;
    p2 = 1;
    listNotAffect: Question[];
    listAffect: Question[];
    px1: number;
    px2: number;

    constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.initializelists();
    }

    initializelists() {
        this.svc.ListQuestionNotAffectForTest(this.otid).subscribe(
            (data) => {
                this.listNotAffect = data;
                this.px1 = Math.trunc(this.listNotAffect.length / 10) + 1;
            }
        );
        this.svc.ListQuestionByTest(this.otid).subscribe(
            (data) => {
                this.listAffect = data;
                this.px2 = Math.trunc(this.listAffect.length / 10) + 1;
            }
        );
        this.svc.EstimatedTimeForTest(this.otid).subscribe((data) => this.time = data);
    }

    affect(q) {
        this.svc.AffectQuestionToAnOnlineTest(this.otid, q).subscribe(() => {
            this.initializelists();
        });
    }

    unaffect(q) {
        this.svc.UnAffectTestQuestion(this.otid, q).subscribe(() => {
            this.initializelists();
        });
    }

    affecttesttocandidate() {
        this.svc.affectTestToAnCandidate(this.cid, this.otid).subscribe(() => this.router.navigate(['/OnlineTest']));
    }


    searchM(module) {
        this.svc.ListQuestionByModuleNotAffectForTest(this.otid, module).subscribe(
            (data) => {
                this.listNotAffect = data;
                this.px1 = Math.trunc(this.listNotAffect.length / 10) + 1;
            }
        );
    }
}
