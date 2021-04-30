import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'

//import { Router, NavigationEnd } from '@angular/router

@Injectable({
  providedIn: 'root'
})
export class BackService {

private history: string[] = [];

  constructor(private router: Router,
              private location: Location) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.history.push(event.urlAfterRedirects)
        }
      })
    }
// function back
goBack(): void {
  console.log('back works');
  (this.history.length > 0) ? this.location.back() : this.router.navigateByUrl('/');
}

} // last key
