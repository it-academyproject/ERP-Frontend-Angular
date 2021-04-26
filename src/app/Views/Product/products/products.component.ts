import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import {  } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShoppingCartService } from '../../../Services/shopping-cart.service';
import { I_ShoppingCartItem } from '../../../Models/shoppingCartItem';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})    
export class ProductsComponent implements OnInit {

  products: any[];

  public page: number;

  public cartItems: I_ShoppingCartItem[] = [];

  public itemAdd: I_ShoppingCartItem;

  public cartUpdated: EventEmitter<string> = new EventEmitter<string>();

  sesionCartName = 'erpCart';
  public cartTotal: number = 0;
  desc: string = "descripcion";
  quantity: number = 0;
  total: number = 1;
  public cart = [];

  public cartSubscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    public shoppingCartService: ShoppingCartService,
    ) {
      this.cart = this.cartItems;
    }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe(
        (data: any) => {
          this.products = data.products;
        },
        error => {
          console.log(error);
        });

        this.cartSubscription = this.shoppingCartService.cartUpdated
      .pipe(delay(100))
      .subscribe(id => { 
        this.cartTotal = this.shoppingCartService.cartTotal;
      });
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartTotal = this.shoppingCartService.cartTotal;
    this.cartItems = this.shoppingCartService.cartItems;
  }

  goDetailProduct(id: number) {
    this.router.navigate(['/detail-product', id]);
  }

  addProductCart(product: any) {

    let item: I_ShoppingCartItem = {
      id: product.id,
      name: product.name,
      desc: "descripción",
      image: product.image,
      price: product.price,
      quantity: 0,
      total: 1
    }

    this.shoppingCartService.addItem(item);

    console.log(item);
    console.log(this.shoppingCartService);

    this.shoppingCartService.getSessionCart();
    this.shoppingCartService.clearSessionStorage();
    this.shoppingCartService.updateItem(item);
    console.log(this.shoppingCartService);

  }

}
