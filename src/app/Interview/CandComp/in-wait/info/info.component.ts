import {Component, Input, OnInit} from '@angular/core';
import {AppliCandService} from '../../../../services/Interview/appli-cand.service';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    @Input() cid;
    @Input() jid;

    constructor(private svc: AppliCandService) {
    }

    ca: { first_Name: string, last_Name: string } = {first_Name: '', last_Name: ''};
    j: { job_title: string } = {job_title: ''};

    ngOnInit() {
        if (this.cid) {
            this.svc.getCandidat(this.cid).subscribe((data) => this.ca = data);
        }
        if (this.jid) {
            this.svc.getJobOffer(this.jid).subscribe((data) => this.j = data);
        }


    }

}
