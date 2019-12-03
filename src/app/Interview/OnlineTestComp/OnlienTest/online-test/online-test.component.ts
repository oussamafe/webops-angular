import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OnlineTest} from '../../../../models/Interview/OnlineTest';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {Question} from '../../../../models/Interview/Question';
import {AppliCandService} from '../../../../services/Interview/appli-cand.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.css']
})
export class OnlineTestComponent implements OnInit {
  closeResult: string;
  focus;
  focus1;
    listOnlinetest: OnlineTest[];
   TESTSPANTITLE = 'All TESTS';
  constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  open(content, type, modalDimension) {
    this.modalService.open(content, {  centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
