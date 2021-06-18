import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import {  } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';


@Component({
  selector: 'app-products-without-session',
  templateUrl: './products-without-session.component.html',
  styleUrls: ['./products-without-session.component.scss']
})
export class ProductsWithoutSessionComponent implements OnInit {

  products: any[];

  public page: number;

  productsCart: number = 0;
  cart = Array();
  showCart;
  productWholesaleCard: number;

  constructor(
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private router: Router) {}

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe(
        (data: any) => {
          this.products = data.products;
        },
        error => {
          console.log(error);
        });
  }

  goDetailProduct(id: number) {
    this.router.navigate(['/detail-product', id]);
  }

  addProductCart(product) {
   /*  this.showCart = (<HTMLInputElement>document.getElementById('showProductsCard'));
    this.cart.push(product);
    this.productsCart++; */



    let totalProductQuantity = 0;
    let totalProductPrice = 0;

    product.orderDetails.forEach(item => {
      totalProductQuantity = item.quantity + totalProductQuantity
      totalProductPrice = item.subtotal + totalProductPrice
    });

   const itemToAdd = {
    id: product.id,
    name: product.name,
    desc: product.name,
    image: product.image,
    price: product.price,
    quantity: totalProductQuantity,
    total: totalProductPrice,
   }

   this.shoppingCartService.addItem(itemToAdd)



  }

   addProductWholesaleCart(product) {
    console.log(product);

      /*this.showCart = (<HTMLInputElement>document.getElementById('showProductsCard'));
    this.productWholesaleCard = product.wholesale_price;
    this.cart.push(product); */


   const itemToAdd = {
    id: product.id,
    name: product.name,
    desc: product.name,
    image: product.image,
    price: product.wholesale_price,
    quantity: product.wholesale_quantity,
    total: product.wholesale_price*product.wholesale_quantity,
   }

   this.shoppingCartService.addItem(itemToAdd)

  }

}
