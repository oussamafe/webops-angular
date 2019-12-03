import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  constructor(private http: HttpClient) { }
myList: any;
url: any = 'http://localhost:9080/webops-web/rest/claims/admin';

  ngOnInit() {
  }
}
