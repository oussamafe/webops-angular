import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Reclamation} from '../model/reclamtion.model';
import 'rxjs-compat/add/operator/finally';
import {tap} from 'rxjs/operators';
import {User} from '../model/user.model';


@Injectable({providedIn: 'root'})
export class PaymentService {
    constructor(private http: HttpClient) { }
    private reclamation: Reclamation[] = [];
    private url = 'http://localhost:9080/webops-web/rest/payment';

    getReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(this.url + '/admin');
    }

    addReclamation(rec: User) {
        return this.http.post<User>(this.url + '/makePay', rec).pipe(
            tap((resultat) => console.log('Résultat de la requête : ', resultat))
        );
    }
}
