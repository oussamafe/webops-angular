import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationLookupService {

  constructor(private http: HttpClient) { }

  lookup(coord: string): Observable<any> {
    let cor = coord.split(',');
    let url = 'http://localhost:9080/webops-web/rest/search/lookup/';
    let link = url.concat(cor[0], '/', cor[1]);
    return this.http.get(link);
  }

  getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
        // Invokes getCurrentPosition method of Geolocation API.
        navigator.geolocation.getCurrentPosition(
            (position: Position) => {
                observer.next(position);
                observer.complete();
            },
            (error: PositionError) => {
                console.log('Geolocation service: ' + error.message);
                observer.error(error);
            }
        );
    });
}
}
