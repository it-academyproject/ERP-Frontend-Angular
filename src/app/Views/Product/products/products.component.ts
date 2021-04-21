import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import {  } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { I_ShoppingCartItem } from '../../../Models/shoppingCartItem';
import { ShoppingCartService } from '../../../Services/shopping-cart.service';
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
  carrito: I_ShoppingCartItem;
  public cartTotal: number = 0;
  desc: string;
  quantity: number;
  total: number;
  public cart = [];

  public cartSubscription: Subscription;

  itemAdd;

  productsCart: number = 0;
  //cart = Array();
  showCart;
  productWholesaleCard: number;

  constructor(
    
    private productsService: ProductsService,
    private router: Router,
    public shoppingCartService: ShoppingCartService,
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

  addProductCart(carrito: I_ShoppingCartItem) {

    this.cart = this.cartItems;
    this.cart.push(carrito);
    //this.saveSessionStorage(this.cart);
    // // Emit cart update observable
    //this.cartUpdated.emit(carrito.id)


    // this.cart.push(carrito);
    // this.productsCart++;
    // console.log(this.productsCart);
    // console.log(this.cart);
    // let i: number;
    // for(i = 0; i < this.cart.length; i++) {
    //   this.itemAdd = this.cart[i];
    //   console.log(this.itemAdd);
    //   console.log(this.itemAdd.name);
    //   console.log(this.itemAdd.price);
    //   console.log(this.productsCart);
    // }
    // this.showCart = (<HTMLInputElement>document.getElementById('showProductsCard')).innerHTML += `Producto añadido: ${this.itemAdd.name} ${this.itemAdd.price} ${this.itemAdd.family} Cantidad: ${this.productsCart}`
  }

  addProductWholesaleCart(product) {
    this.showCart = (<HTMLInputElement>document.getElementById('showProductsCard'));
    this.productWholesaleCard = product.wholesale_price;
    this.cart.push(product);
  }

}
