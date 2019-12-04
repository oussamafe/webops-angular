import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AvailabilityService} from '../../../../services/Interview/availability.service';
import {Availability} from '../../../../models/Interview/Availability';
import {AppliCandService} from '../../../../services/Interview/appli-cand.service';

@Component({
    selector: 'app-avability-user',
    templateUrl: './avability-user.component.html',
    styleUrls: ['./avability-user.component.css']
})
export class AvabilityUserComponent implements OnInit {

    userID = this.actRoute.snapshot.params['uid'];
    typeu: number; // 0 for Candidate  // 1 for Employee

    // tslint:disable-next-line:max-line-length
    constructor(private actRoute: ActivatedRoute, private router: Router, private svc: AvailabilityService, private sapp: AppliCandService) {
    }

    currava: Availability;
    Listava: Availability[];
    px: number;
    p = 1;

    ngOnInit() {
        this.sapp.getuserType(this.userID).subscribe((data) => {
            this.typeu = data;
            if (this.typeu === 0) {
                this.svc.ListAvailabilityCandidate(this.userID).subscribe((dodo) => {
                    this.Listava = dodo;
                    this.px = Math.trunc(this.Listava.length / 10) / 3 + 1;
                });
            } else {
                this.svc.ListAvailabilityEmploye(this.userID).subscribe((dodo) => {
                    this.Listava = dodo;
                    this.px = Math.trunc(this.Listava.length / 10) + 1;
                });
            }
        });
    }
}
