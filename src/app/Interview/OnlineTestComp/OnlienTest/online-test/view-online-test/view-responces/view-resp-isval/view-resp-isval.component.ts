import {Component, Input, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../../../../services/Interview/online-test.service';

@Component({
  selector: 'app-view-resp-isval',
  templateUrl: './view-resp-isval.component.html',
  styleUrls: ['./view-resp-isval.component.css']
})
export class ViewRespIsvalComponent implements OnInit {
  @Input() rid;
  isvalid: boolean;
  constructor(private svc: OnlineTestService) { }

  ngOnInit() {
    this.svc.getStateResponcebyId(this.rid).subscribe(
        (data) => {
          this.isvalid = data;
        }
    );
  }

}
