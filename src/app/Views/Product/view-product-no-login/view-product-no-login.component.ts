

import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { faCartPlus, faClipboardCheck, faEuroSign, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
// services
import { ProductsService } from 'src/app/Services/products.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
// single product
import { newProductDto } from "src/app/Models/DTOs/newProductDto";
// what page we are at
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// cartT
import { I_ShoppingCartItem } from 'src/app/Models/shoppingCartItem';

@Component({
  selector: 'app-view-product-no-login',
  templateUrl: './view-product-no-login.component.html',
  styleUrls: ['./view-product-no-login.component.scss','product-view-no-login.scss']
})
export class ViewProductNoLoginComponent implements OnInit {
  @Input() type: any
  @Output() cartUpdated = new EventEmitter();

  products: any;
  product: any;
  productsSub$: Subscription;
  id: number;
  myNum: number = 1;
  // cart from service
  cart: ShoppingCartService [] = [];

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

// cartT
public cartTotal: number = 0;
public cartItems: I_ShoppingCartItem[] = [];

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
              private route: ActivatedRoute,
              private router: Router) {
     this.createForm();
               }

ngOnInit(): void {

this.pickUpProduct();

}

pickUpProduct(){
  let id = +this.route.snapshot.paramMap.get('id');
  this.productsService.getProducts()
    .subscribe(
      (data: any) => {
        this.products = data.products[id - 1];
        console.log(this.products);
        this.addingPrice(this.products.price);
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

toShoppingCard(product: any, quantity?: number){
let units = this.productForm.get('quantity').value;
quantity = parseInt(units);
let item: I_ShoppingCartItem = {
  id: product.id,
  name: product.name,
  desc: "descripción",
  image: product.image,
  price: product.price,
  quantity: 1,
  total: 1
}
item.total = product.price * quantity;
this.addingPrice(item.total);
this.shoppingCartService.addItem(item, quantity);
this.shoppingCartService.updateItem(item);
}

addingPrice(num: number): number {
  let units = this.productForm.get('quantity').value;
    this.controlStocks(units);
return  this.myValue = units*num;
}

showOfferPrice(num: number): number{
  // add to the normal price a 25% margin
  // can be changed at any given time
let sugarPrice: number = num + num * 0.25;
return sugarPrice;
}


controlStocks(num:number): number{
  console.log(num);
  console.log(this.products.stock);
   return this.products.stock;
}

goCheckOut() {
  console.log('checkout  works');
  //this.toShoppingCard(product, quantity);
  this.router.navigate(['/checkout']);
};

// ngOnDestroy can't be used in this component as is need it to either go to products or the cart
}
// documentation
// https://stackoverflow.com/questions/7372067/is-there-any-way-to-prevent-input-type-number-getting-negative-values
//
