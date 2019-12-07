import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/finally';
import {tap} from 'rxjs/operators';
import {PackModel} from '../model/pack.model';


@Injectable({providedIn: 'root'})
export class PackService {
    constructor(private http: HttpClient) { }
    private url = 'http://localhost:9080/webops-web/rest/packs';

    getPacks(): Observable<PackModel[]> {
        return this.http.get<PackModel[]>(this.url);
    }

    addPacks(rec: PackModel): Observable<PackModel> {
        return this.http.post<PackModel>(this.url, rec).pipe(
            tap(() => {})
        );
    }
    delete(reference) {
        return this.http.delete(`http://localhost:9080/webops-web/rest/packs/${reference}`);
    }
    editPack(rec: PackModel): Observable<PackModel> {
        return this.http.put<PackModel>(this.url, rec).pipe(
            tap(() => {} )
        );
    }
}
