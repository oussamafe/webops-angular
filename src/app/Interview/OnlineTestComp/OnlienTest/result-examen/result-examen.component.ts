import {Component, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-result-examen',
    templateUrl: './result-examen.component.html',
    styleUrls: ['./result-examen.component.css']
})
export class ResultExamenComponent implements OnInit {

    constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) {
    }

    testss: { id: number; date: string; state: string, note: any } = {id: null, date: '', state: '', note: null};
    candidateid = this.actRoute.snapshot.params['cid'];

    ngOnInit() {
        this.svc.getOnlineTestCandidate(this.candidateid).subscribe((data) => {
            this.testss = data;
        });
    }

}
