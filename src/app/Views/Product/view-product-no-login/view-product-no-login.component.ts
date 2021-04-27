

import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { faCartPlus, faClipboardCheck, faEuroSign, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
// services
import { ProductsService } from 'src/app/Services/products.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
// single product
import { newProductDto } from "src/app/Models/DTOs/newProductDto";
// what page we are at
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-product-no-login',
  templateUrl: './view-product-no-login.component.html',
  styleUrls: ['./view-product-no-login.component.scss','product-view-no-login.scss']
})
export class ViewProductNoLoginComponent implements OnInit {
  products: any;
  product: any;
  productsSub$: Subscription;
  id: number;
  myNum: number = 1;
  // cart from service
  cart: ShoppingCartService [] = [];
  public cartUpdated: EventEmitter<string> = new EventEmitter<string>();
   //Icons
  faMinus = faMinus;
  faPlus = faPlus;
  faCartPlus = faCartPlus;
  faCheck = faCheckCircle;
  faClipBoardCheck = faClipboardCheck;
  faCheckCircle = faCheckCircle;
  faEuro = faEuroSign;

  // selectors
  plusOne: HTMLElement = document.querySelector('#plusToBuy');
  minusOne: HTMLElement = document.querySelector('#minusToBuy');
  numberUnits: string | number | any;
  myValue: any | number;

// declaration reactive form with formBuilder
productForm: FormGroup;
// reactive form with form Control
          /* productForm = new FormGroup({
            quantity: new FormControl('1'),
            totalPrice: new FormControl()
          }); */


  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {

     this.createForm();
               }

  ngOnInit(): void {

this.pickUpProduct();

// this.productsSub$ = this.productsService.getProducts(this.id)
// .subscribe(product => {
//   this.product = product;
}
    /*
     * product should come from F52
     * <a routerLink="product.id"></a>
     */
pickUpProduct(){
  let id = +this.route.snapshot.paramMap.get('id');
  console.log(id);
  // fake way to obtain one product
  this.productsService.getProducts()
    .subscribe(
      (data: any) => {
        this.products = data.products[id - 1];
        console.log(this.products);
      },
      error => {
        console.log(error);
      });
}



  createForm(){
    // reactive form group Builder
this.productForm = this.formBuilder.group({
  quantity: ['1', Validators.pattern('^[0-9]+$')],
  totalPrice: ['', Validators.pattern('^[0-9]+$')]
})
  }

  toShoppingCard(id: number, quantity: number){
    // add to the basket
id = this.products.id;
let units = this.productForm.get('quantity').value;
quantity = units;
this.shoppingCartService.addItem(this.products, quantity);
console.log(this.productForm);
let total: any = this.shoppingCartService.cartItems.length;
alert(total);
  }

addingPrice(num: number): number {
  let units = this.productForm.get('quantity').value;
    this.controlStocks(units);
return  this.myValue = units*num;

}

controlStocks(num:number): number{
  console.log(num);
  console.log(this.products.stock);
  return this.products.stock;
}
// ngOnDestroy(): void {
//    this.productsSub$.unsubscribe();
//  }

}
