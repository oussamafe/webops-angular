import {Component, OnInit} from '@angular/core';
import {Application} from '../../../models/Interview/Application';
import {AppliCandService} from '../../../services/Interview/appli-cand.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
    focus;
    focus1;
    listapplicaion: Application[];
    titleApp = 'Still Wait Applications';
    constructor(private svc: AppliCandService, private actRoute: ActivatedRoute, private router: Router, private auth: AuthService) {
    }

    ngOnInit() {
        this.svc.ApplicationStillWait().subscribe((data) => {
            this.listapplicaion = data;
        });
    }

    showstill() {
        this.svc.ApplicationStillWait().subscribe((data) => {
          this.titleApp = 'Still Wait Applications';
          this.listapplicaion = data;
          this.router.navigate(['/Applications']);
        });
    }

    showaccepted() {
        this.svc.ApplicationAccepted().subscribe((data) => {
            this.titleApp = 'Accepted Applications';
            this.listapplicaion = data;
            this.router.navigate(['/Applications']);
        });
    }

    showrejected() {
        this.svc.ApplicationRejected().subscribe((data) => {
          this.titleApp = 'Rejected Applications';
          this.listapplicaion = data;
          this.router.navigate(['/Applications']);
        });
    }

    acceptcand(can: Application) {
        this.svc.acceptApplication(can.id).subscribe(() => this.showstill() );
    }

    rejectcand(can: Application) {
        this.svc.RejectApplication(can.id).subscribe(() => this.showstill());
    }
}
