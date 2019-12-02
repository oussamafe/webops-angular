import {Component, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../../models/Interview/Question';

@Component({
    selector: 'app-add-responce',
    templateUrl: './add-responce.component.html',
    styleUrls: ['./add-responce.component.css']
})
export class AddResponceComponent implements OnInit {

    idq = this.actRoute.snapshot.params['idq'];
    quest: { estimated_Time: number; question: string; module: string } = {question: '', module: '', estimated_Time: 2};
    res = {reponce: '', isValid: true};

    constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.svc.getQuestionbyid(this.idq).subscribe(
            (data) => {
                this.quest = data;
            }
        );
    }

    check(bo) {
        this.res.isValid = bo;
    }

    addResp() {
        this.svc.addAndAffectResponce(this.idq, this.res)
            .subscribe(
                (data) => this.router.navigate(['/Responce/' + this.idq])
            );
    }
}
