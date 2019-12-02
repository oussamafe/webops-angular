import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OnlineTestService} from '../../../../../services/Interview/online-test.service';
import {IAlert} from '../../../../../sections/alerts-section/alerts-section.component';

@Component({
    selector: 'app-res-isvalid',
    templateUrl: './res-isvalid.component.html',
    styleUrls: ['./res-isvalid.component.css']
})
export class ResIsvalidComponent implements OnInit {
    @Input() rid;
    isvalid: boolean;

    constructor(private svc: OnlineTestService) {
    }

    ngOnInit() {
        this.svc.getStateResponcebyId(this.rid).subscribe(
            (data) => {
                this.isvalid = data;
            }
        );
    }

    onchange(val) {

        if (val === 'false') {
            this.svc.setResponceInValid(this.rid).subscribe();

        } else {
            this.svc.setResponceValid(this.rid).subscribe();
        }
    }
}
