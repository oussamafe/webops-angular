import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OnlineTest} from '../../../../models/Interview/OnlineTest';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {Question} from '../../../../models/Interview/Question';
import {AppliCandService} from '../../../../services/Interview/appli-cand.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.css']
})
export class OnlineTestComponent implements OnInit {

  focus;
  focus1;
    listOnlinetest: OnlineTest[];
   TESTSPANTITLE = 'All TESTS';
  constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.svc.ListAlltest().subscribe(
        (data) => {this.listOnlinetest = data;  }
    );
  }

  showstill() {
    this.svc.ListAlltest().subscribe((data) => {
      this.TESTSPANTITLE = 'All TESTS';
      this.listOnlinetest = data;
      this.router.navigate(['/OnlineTest']);
    });
  }

  showvalid() {
    this.svc.ListAcceptedtest().subscribe((data) => {
      this.TESTSPANTITLE = 'Valid TESTS';
      this.listOnlinetest = data;
      this.router.navigate(['/OnlineTest']);
    });
  }

  showInvalid() {
    this.svc.ListRejectedtest().subscribe((data) => {
      this.TESTSPANTITLE = 'Invalid TESTS';
      this.listOnlinetest = data;
      this.router.navigate(['/OnlineTest']);
    });
  }


  DeleteOnlineTest(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.svc.DeleteTest(id).subscribe(data => {
        this.svc.ListAlltest().subscribe(
            (datao) => this.listOnlinetest = datao);
      });
    }
  }
}
