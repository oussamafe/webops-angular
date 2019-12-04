import {Component, Input, OnInit} from '@angular/core';
import {AvailabilityService} from '../../../../../services/Interview/availability.service';

@Component({
    selector: 'app-suitforavauser',
    templateUrl: './suitforavauser.component.html',
    styleUrls: ['./suitforavauser.component.css']
})
export class SuitforavauserComponent implements OnInit {

    @Input() uid;
    @Input() utype;
    @Input() date;
    @Input() starthour;
    ava: { id: number; start_hour: number; end_hour: number; date: string; state: string } = {
        id: null,
        start_hour: null,
        end_hour: null,
        date: '',
        state: ''
    };

    constructor(private svc: AvailabilityService) {
    }

    ngOnInit() {
        if (this.utype === 0) {
            this.svc.OneAvailabilityCandidate(this.uid, this.date, this.starthour).subscribe((data) => this.ava = data);
        } else {
            this.svc.OneAvailabilityEmploye(this.uid, this.date, this.starthour).subscribe((data) => this.ava = data);
        }
    }

    onchange(val) {
        if (this.utype === 0) {
            if (val === 'false') {
              // tslint:disable-next-line:max-line-length
                this.svc.SetNoAvailibleCandidate(this.uid, this.date, this.starthour).subscribe(() => this.svc.OneAvailabilityCandidate(this.uid, this.date, this.starthour).subscribe((data) => this.ava = data));
            } else {
              // tslint:disable-next-line:max-line-length
                this.svc.SetAvailibleCandidate(this.uid, this.date, this.starthour).subscribe(() => this.svc.OneAvailabilityCandidate(this.uid, this.date, this.starthour).subscribe((data) => this.ava = data));
            }
        } else {
            if (val === 'false') {
              // tslint:disable-next-line:max-line-length
                this.svc.SetNoAvailibleEmploye(this.uid, this.date, this.starthour).subscribe(() => this.svc.OneAvailabilityEmploye(this.uid, this.date, this.starthour).subscribe((data) => this.ava = data));
            } else {
              // tslint:disable-next-line:max-line-length
                this.svc.SetAvailibleEmploye(this.uid, this.date, this.starthour).subscribe(() => this.svc.OneAvailabilityEmploye(this.uid, this.date, this.starthour).subscribe((data) => this.ava = data));
            }
        }
    }
}
