import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {HelpService} from '../services/help.service';
import {HelpAide} from '../model/help.model';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(public helpService: HelpService) { }

  sujet: HelpAide[];
  private sujetSub: Subscription;

  ngOnInit() {
    this.sujetSub = this.helpService.getListSujet().subscribe(
        (recl: HelpAide[]) => {this.sujet = recl;
        });
  }

}
