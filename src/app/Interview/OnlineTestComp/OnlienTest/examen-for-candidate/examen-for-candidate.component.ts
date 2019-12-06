import {Component, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../../models/Interview/Question';
import {Responce} from '../../../../models/Interview/Responce';

@Component({
    selector: 'app-examen-for-candidate',
    templateUrl: './examen-for-candidate.component.html',
    styleUrls: ['./examen-for-candidate.component.css']
})
export class ExamenForCandidateComponent implements OnInit {

    constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) {
    }

    tiimm: any;
    munitttt = 0;
    timeerr = 0;
    starq = false;
    testss: { id: number; date: string; state: string, note: any } = {id: null, date: '', state: '', note: null};
    candidateid = this.actRoute.snapshot.params['cid'];
    listQuestion: Question[];
    quest: { id: number; estimated_Time: number; question: string; module: string } = {
        id: null,
        question: '',
        module: '',
        estimated_Time: null
    };
    listResponces: Responce[];
    listResid = new Array();

    ngOnInit() {
        this.svc.getOnlineTestCandidate(this.candidateid).subscribe((data) => {
            this.testss = data;
            this.svc.ListQuestionByTest(this.testss.id).subscribe((datada) => {
                this.listQuestion = datada;
            });
        });
    }

    startest() {
        this.starq = true;
        this.quest = this.listQuestion.pop();
        this.svc.ListResponceByQuestion(this.quest.id).subscribe(
            (data) => {
                this.listResponces = data;
                this.startTimer(this.quest.estimated_Time);
            }
        );
    }

    startTimer(t) {
        this.timeerr = t * 60;
        this.timedCount();
    }

    stopCount() {
        clearTimeout(this.tiimm);
        this.timeerr = 0;
    }

    timedCount() {
        if (this.timeerr === 0) {
            if (this.listQuestion.length === 0) {
                this.endtest();
            } else {
                this.nextques();
            }
        } else {
            this.tiimm = setTimeout(() => {
                this.timeerr = this.timeerr - 1;
                this.munitttt = Math.trunc(this.timeerr / 60);
                this.timedCount();
            }, 100);
        }
    }

    onboxcheck(id) {
        if (this.listResid.indexOf(id) < 0) {
            this.listResid.push(id);
        } else {
            this.listResid.splice(this.listResid.indexOf(id), 1);
        }
    }

    nextques() {
        this.stopCount();
        this.svc.setTestNoteByQuestion(this.testss.id, this.quest.id, this.listResid).subscribe();
        this.quest = this.listQuestion.pop();
        this.svc.ListResponceByQuestion(this.quest.id).subscribe(
            (data) => {
                this.listResponces = data;
                this.listResid = new Array();
                this.startTimer(this.quest.estimated_Time);
            }
        );
    }

    endtest() {
        this.svc.setTestNoteByQuestion(this.testss.id, this.quest.id, this.listResid).subscribe(
            () => this.svc.setTestResult(this.testss.id).subscribe(
                () => this.router.navigate(['/ResultExamen/' + this.candidateid]))
        );
    }
}
