

import { Component, EventEmitter, OnInit } from '@angular/core';
import { faCartPlus, faClipboardCheck, faEuroSign, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
// services
import { ProductsService } from 'src/app/Services/products.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-view-product-no-login',
  templateUrl: './view-product-no-login.component.html',
  styleUrls: ['./view-product-no-login.component.scss','product-view-no-login.scss']
})
export class ViewProductNoLoginComponent implements OnInit {
  products: any;
  id: number;
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
              private formBuilder: FormBuilder) {

     this.createForm();
               }

  ngOnInit(): void {
    // fake way to obtain one product
    this.productsService.getProducts()
      .subscribe(
        (data: any) => {
          this.products = data.products[0];
          console.log(this.products);
        },
        error => {
          console.log(error);
        });

    /*
     * product should come from F52
     * <a routerLink="product.id"></a>
     */


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

addingPrice(num: number) {
  let units = this.productForm.get('quantity').value;
  this.myValue = units*num;
}

}
