import {Component, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
    //
    qss = {estimated_Time: null, question: '', module: ''};
    otid = this.actRoute.snapshot.params['otid'];
    cid = this.actRoute.snapshot.params['cid'];

    constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) {
    }

    addQuest() {
        if (this.otid && this.cid) {
            this.svc.addQuestion(this.qss)
                .subscribe(
                    (data) => {
                        this.router.navigate(['/AddResponce/' + this.cid + '/' + this.otid + '/' + data]);
                    }
                );
        } else {
            this.svc.addQuestion(this.qss)
                .subscribe(
                    (data) => this.router.navigate(['/Question'])
                );
        }
    }

    ngOnInit() {
    }

}
