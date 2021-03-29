import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
// if need to go to single product, import router

@Component({
  selector: 'app-products-no-login',
  templateUrl: './products-no-login.component.html',
  styleUrls: ['./products-no-login.component.scss']
})
export class ProductsNoLoginComponent implements OnInit {

   //Icons
   faTrashAlt = faTrashAlt;
   faEdit = faEdit;
  // where to place the data coming from database
   products: any[];
  // service to be used to get to endpoint
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    // method to get to the endpoint all products
    this.productsService.getAllProductsNoLogin().subscribe(
      (data: any) => {
        this.products = data.products;
        console.log(this.products);
      },
      error => {
        console.log(error);
      });
  }

}
