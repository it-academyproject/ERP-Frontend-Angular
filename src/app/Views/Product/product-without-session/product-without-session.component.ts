import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
  selector: 'app-product-without-session',
  templateUrl: './product-without-session.component.html',
  styleUrls: ['./product-without-session.component.scss']
})
export class ProductWithoutSessionComponent implements OnInit {

  products: any[];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProductsNoLogin()
      .subscribe(
        (data: any) => {
          this.products = data.products;
        },
        error => {
          console.log(error);
        });
  }

}
