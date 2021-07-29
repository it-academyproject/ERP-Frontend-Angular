import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { RespClients } from '../Models/ReqResClients';



@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url: string = 'http://217.76.158.200:8080';
  endPoint: string = '/api/clients';
  token: string;
  clientsPerPage: number = 5;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {
    //Accedemos al servicio de login para recuperar el token que se ha guardado
    this.token = this.loginService.getBearerToken;
  }

  getAllClients() {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.httpClient.get( `${this.url}${this.endPoint}`, {headers} );
  }

  getClients(amount: number, page: number ) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.httpClient.get( `${this.url}${this.endPoint}/list/${amount}/${page}`, {headers} );
  }

  getClientByID(id: string ):Observable<RespClients> {
    const headers = new HttpHeaders({
      Authorization: this.token
    });
    console.log(headers)
    return this.httpClient.get<RespClients>( `${this.url}${this.endPoint}/${id}`, {headers} );
  }

  updateClient(client) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });
    console.log(client)
    return this.httpClient.put( `${this.url}${this.endPoint}`, client, {headers} );
  }

  deleteClient(id: string) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.httpClient.delete( `${this.url}${this.endPoint}/${id}`, {headers} );
  }
}
