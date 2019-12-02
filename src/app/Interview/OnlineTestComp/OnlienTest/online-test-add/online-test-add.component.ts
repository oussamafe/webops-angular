import { Component, OnInit } from '@angular/core';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';

@Component({
  selector: 'app-online-test-add',
  templateUrl: './online-test-add.component.html',
  styleUrls: ['./online-test-add.component.css']
})
export class OnlineTestAddComponent implements OnInit {
  qss = {date: '', state: '', note: 0};

  constructor(private svc: OnlineTestService) { }
  ngOnInit() {
  }
  addTest() {
    this.svc.addOnlineTest(this.qss)
        .subscribe(
            (data) => console.log('id=' + data),
            error => console.log(error),
            () => console.log('Question add with success')
        );
  }
}
