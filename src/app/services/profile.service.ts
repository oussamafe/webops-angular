import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getEmployeeDetails() {
    return this.http.get<any>(`${config.apiUrl}/employee/show/employee`);
  }
}
