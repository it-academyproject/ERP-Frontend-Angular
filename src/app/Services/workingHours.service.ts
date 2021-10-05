import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReqResponseEmployees } from '../Models/reqResponse';

import { WorkingHoursComponent } from '../Views/working-hours/working-hours.component';
import { LoginService } from './login.service';
import { WorkingHours } from '../Models/workingHours';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkingHoursService {
  url: string = 'http://217.76.158.200:8080';
  endPoint: string = '/api/workinghours';
  token: string;

  constructor(private http: HttpClient, private loginService: LoginService) {
    //Accedemos al servicio de login para recuperar el token que se ha guardado
    this.token = this.loginService.getBearerToken;
  }

  getAllWorkingHours() {
    const headers = new HttpHeaders({
      Authorization: this.token,
    });

    return this.http.get<WorkingHours>(`${this.url}${this.endPoint}`, {
      headers,
    });
  }

  getWorkingHoursByID(id: string) {
    const headers = new HttpHeaders({
      Authorization: this.token,
    });
    return this.http.get<WorkingHours>(`${this.url}${this.endPoint}/${id}`, {
      headers,
    });
  }
}
