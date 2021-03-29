import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.scss']
})
export class NavbarClientComponent implements OnInit {

  langs: string[] = [];
  products: any[];
  constructor(public appComponent: AppComponent,
    public productService: ProductsService,
    private router: Router) {
    this.langs = appComponent.langs;
  }

  ngOnInit(): void {
  }

  changeLanguage(lang: string) {
    this.appComponent.changeLang(lang);
  }

}
