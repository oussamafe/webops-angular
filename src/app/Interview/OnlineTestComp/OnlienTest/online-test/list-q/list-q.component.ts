import {Component, Input, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../../services/Interview/online-test.service';
import {Question} from '../../../../../models/Interview/Question';

@Component({
    selector: 'app-list-q',
    templateUrl: './list-q.component.html',
    styleUrls: ['./list-q.component.css']
})
export class ListQComponent implements OnInit {
    List_Module_By_Test: string[];

    constructor(private svc: OnlineTestService) {
    }

    @Input() id;

    ngOnInit() {
        this.svc.getModulsByTest(this.id).subscribe(
            (data) => {
                this.List_Module_By_Test = data;
            }
        );
    }
}

