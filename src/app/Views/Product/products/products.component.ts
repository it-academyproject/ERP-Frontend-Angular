import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShoppingCartService } from '../../../Services/shopping-cart.service';
import { I_ShoppingCartItem } from '../../../Models/shoppingCartItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})    
export class ProductsComponent implements OnInit {
  
  products: any[];

  public page: number;

  public cartItems: I_ShoppingCartItem[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    public shoppingCartService: ShoppingCartService
  ) {}

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
    this.router.navigate(['/product-detail-view', id]);
  }

  addProductCart(product: any) {

    //let contador: number = 0;

    let item: I_ShoppingCartItem = {
      id: product.id,
      name: product.name,
      desc: "descripción",
      image: product.image,
      price: product.price,
      quantity: 1,
      total: 1
    }

    item.total = item.price * item.quantity;

    this.shoppingCartService.cart.push(item);
    console.log(this.shoppingCartService.cart);

    // for (let i = 0; i < this.shoppingCartService.cart.length; i++) {
    //   if(this.shoppingCartService.cart[i].id === item.id) {
    //     this.shoppingCartService.cart[i].quantity++;
    //     item.total = item.price * item.quantity;
    //   }
    // }

    this.shoppingCartService.cartItems.push(item);

    this.shoppingCartService.addItem(item);

    this.shoppingCartService.updateItem(item);

    this.cartItems.push(item);

    //contador++;
  }

  addProductWholesaleCart(product: any) {

    let item: I_ShoppingCartItem = {
      id: product.id,
      name: product.name,
      desc: "descripción",
      image: product.image,
      price: product.wholesale_price,
      quantity: product.wholesale_quantity,
      total: product.wholesale_quantity
    }

    item.total = item.price * item.quantity;

    this.shoppingCartService.cart.push(item);
    console.log(this.shoppingCartService.cart);

    this.shoppingCartService.cartItems.push(item);

    this.shoppingCartService.addItem(item);

    this.shoppingCartService.updateItem(item);

    this.cartItems.push(item);

  }

}
