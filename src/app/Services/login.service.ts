import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

import { I_logedUser } from 'src/app/Models/logedUser';
import { I_loginAPIres } from '../Models/loginAPIres';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://217.76.158.200:8080';
  endpoint = '/api/login';
  APIresName = 'erpToken';
  APIres: I_loginAPIres;

  constructor(private http: HttpClient) {}

  // POST
  loginUser(body: I_logedUser): Observable<I_loginAPIres> {
    return this.http.post<I_loginAPIres>(this.url + this.endpoint, body, {
      responseType: 'json',
    });
    // .pipe(map((res: I_loginAPIres): string => res.token));
  }

  // API REST response - persisted in localStorage
  saveSession(APIres: I_loginAPIres): void {
    // save in Browser
    sessionStorage.setItem(this.APIresName, <string>JSON.stringify(APIres));

    // save in App
    if (sessionStorage.length > 0) {
      this.APIres = <I_loginAPIres>(
        JSON.parse(sessionStorage.getItem(this.APIresName))
      );
    }
  }

  clearSession(): void {
    // remove in Browser
    sessionStorage.removeItem(this.APIresName);

    // remove in App
    this.APIres = {} as I_loginAPIres;
  }

  // getters
  get getAPIres(): I_loginAPIres {
    if (sessionStorage.getItem(this.APIresName) === JSON.stringify(this.APIres))
      return this.APIres;
  }

  get getToken(): string {
    if (
      JSON.parse(sessionStorage.getItem(this.APIresName)).token ===
      this.APIres.token
    )
      return this.APIres.token;
  }

  get getBearer(): string {
    if (
      JSON.parse(sessionStorage.getItem(this.APIresName)).bearer ===
      this.APIres.bearer
    )
      return this.APIres.bearer;
  }

  get getBearerToken(): string {
    if (
      JSON.parse(sessionStorage.getItem(this.APIresName)).token ===
        this.APIres.token &&
      JSON.parse(sessionStorage.getItem(this.APIresName)).bearer ===
        this.APIres.bearer
    )
      return `${this.APIres.bearer} ${this.APIres.token}`;
  }

  get getUserName(): string {
    if (
      JSON.parse(sessionStorage.getItem(this.APIresName)).nombreUsuario ===
      this.APIres.nombreUsuario
    )
      return this.APIres.nombreUsuario;
  }

  get getUserRole(): string {
    if (
      JSON.parse(sessionStorage.getItem(this.APIresName)).authorities[0]
        .authority === this.APIres.authorities[0].authority
    )
      return this.APIres.authorities[0].authority;
  }
}

/*

e.g. DTO

authorities: [ { authority: "ROLE_CLIENT" }... ]
bearer: "Bearer"
nombreUsuario: "D3831093R"
token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEMzgzMTA5M1IiLCJleHAiOjE2MTMwNjI0ODIsImlhdCI6MTYxMzA0NDQ4Mn0.aRLZ8_wNMVUws5zF3aM7Mh4cnpE9dAyqX4hnaMP2Lf_tKSBw7IiWJ9FncLE9NjgA8z4WCPoX1LDPrLIFeXcZ1g"

*/
