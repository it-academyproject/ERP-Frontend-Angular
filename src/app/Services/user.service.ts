
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { User } from '../Models/user.model';

//declaramos la url base de nuestros endpoints
const base_url = environment.base_url;




@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Creamos la propiedad de nuestro clase que va a ser de tipo User
  public user: User ;

  //Injectamos o que necesitaremos para navegar y llamar a API's
  constructor( private http: HttpClient,
              private router: Router) {}
  
  //Obtenemos el token que se guarda en LocalStorage
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  //Obtenemos el id de usuario
  get uid():string {
    return this.user.uid || '';
  }
            

    //Creamos el método para modificar Usuario
    updateProfile( data: { email: string, nombre: string, address: string } ) {
  
      data = {
        ...data,
        address: this.user.address,
        nombre: this.user.username
      };
  
      return this.http.put(`${ base_url }/users`, data, {
        headers: {
          'x-token': this.token
        }
      });
  
    }
  
   

  }






