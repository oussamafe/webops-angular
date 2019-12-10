import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/finally';
import {tap} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class DashboardService {
    constructor(private http: HttpClient) { }
    private reclamation: [] = [];
    private url = 'http://localhost:9080/webops-web/rest/claims';

    NombreDesReclamationParMois(): Observable<[]> {
        return this.http.get<[]>(this.url + '/stat/mois');
    }

}
