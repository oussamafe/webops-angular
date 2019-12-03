import { Component, OnInit } from '@angular/core';
import {HelpAide} from '../../model/help.model';
import {Subscription} from 'rxjs';
import {HelpService} from '../../services/help.service';

@Component({
  selector: 'app-help-list',
  templateUrl: './help-list.component.html',
  styleUrls: ['./help-list.component.css']
})
export class HelpListComponent implements OnInit {

  constructor(public helpService: HelpService) { }
  sujet: HelpAide[];
  private sujetSub: Subscription;

  ngOnInit() {
    this.sujetSub = this.helpService.getListSujet().subscribe(
        (recl: HelpAide[]) => {this.sujet = recl;
        });
  }

}
