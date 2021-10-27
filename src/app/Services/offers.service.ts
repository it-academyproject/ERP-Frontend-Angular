import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})


export class OffersService {
  url: string = 'http://217.76.158.200:8080';
  endPoint: string = '/api/offers';
  token: string;


  offerById: Observable<any>;


  constructor(private httpClient: HttpClient, private loginService: LoginService) {
    this.token = this.loginService.getBearerToken;
   }

   headers: HttpHeaders = new HttpHeaders({
     Authorization: this.loginService.getBearerToken
   });

   getAllOffers(){
     return this.httpClient.get(`${this.url}${this.endPoint}`, {headers: this.headers});
   }

<<<<<<< Updated upstream
   //Get offers by id
   getOfferById(id: string){
     return (this.offerById = this.httpClient.get(`${this.url}${this.endPoint}/${id}`, {headers: this.headers}));
   }
}
=======
    deleteOffer(id: string) {    
      const options = {
        headers: new HttpHeaders({
          Authorization: this.token
        }),
        body: {
          id: id,
          name: "offer deteled!!!"
        }
      };
      return this.httpClient.delete(`${this.url}${this.endPoint}`, options);
    }

    createOffer(offer){
      let body = new Offer ( offer.id, offer.name, offer.discount, offer.start_date, offer.end_date, offer.paid_quantity, offer.free_quantity);

      const options = {
        headers: new HttpHeaders({
          Authorization: this.token
        })
      }
      return this.httpClient.post(`${this.url}${this.endPoint}`, body, options);
    }
  }
>>>>>>> Stashed changes

