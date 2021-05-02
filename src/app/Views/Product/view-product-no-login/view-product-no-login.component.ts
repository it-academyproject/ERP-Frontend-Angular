

import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
// icons
import { faCartPlus, faClipboardCheck, faEuroSign, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
// services
import { ProductsService } from 'src/app/Services/products.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
// single product model
import { newProductDto } from "src/app/Models/DTOs/newProductDto";
// what page we are at
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// cartT product model
import { I_ShoppingCartItem } from 'src/app/Models/shoppingCartItem';
// user experience
import { ToastrService } from 'ngx-toastr';
// back history
import { BackService } from 'src/app/Services/back.service';


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
  sendIt: boolean = false;
  radioTrue: boolean = true;
  price: number;
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

// placeholders
placeholder: any = {
  quantity: "Quantity",
  total: "Total to pay"
}

// declaration reactive form with formBuilder
productForm: FormGroup;
// reactive form with form Control
          /* productForm = new FormGroup({
            quantity: new FormControl('1'),
            totalPrice: new FormControl()
          }); */
radioForm = new FormGroup({
  radioCheckForm: new FormControl('',Validators.required)
});

constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private navigationBack: BackService) {
     this.createForm();
     // this.radioForm();
               }

ngOnInit(): void {

this.pickUpProduct();
}

pickUpProduct(){
  //  pickup product through id
  let id = +this.route.snapshot.paramMap.get('id');
  this.productsService.getProducts()
    .subscribe(
      (data: any) => {
        this.products = data.products[id - 1];
        console.log(this.products);
        this.addingPrice(this.products.price);
      },
      error => {
        // manage the error
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
//  you fool! getters and setters!
getRadioForm(num: number): number {
  console.log(this.radioForm.value);
  (num == 1) ? this.price = this.products.price
            : this.price = this.products.wholesale_price;
this.myValue = this.price;
  return this.price;
}
changePrice(e){
  console.log(e.target.value);
  this.getRadioForm(e.target.value);
  (e.target.value == 1) ? this.radioTrue = true : this.radioTrue = false;
  console.log(this.radioTrue);
}
toShoppingCard(product: any, quantity?: number){
// let units = this.productForm.get('quantity').value;
// quantity = parseInt(units);
// (this.radioTrue == true) ? product.price = this.products.price : product.price = this.products.wholesale_price;

let item: I_ShoppingCartItem = {
  id: product.id,
  name: product.name,
  desc: "descripción",
  image: product.image,
  price: product.price,
  quantity: quantity,
  total: 1
}

if(this.radioTrue == true) {
  item.price = product.price
} else {
  item.price = product.wholesale_price;
}
item.total = item.price * quantity;
this.shoppingCartService.addItem(item, quantity);
this.shoppingCartService.getSessionCart();
this.shoppingCartService.clearSessionStorage();
this.shoppingCartService.updateItem(item);
// user experience
this.toastr.success(`${item.name} added successfully to your cart`, "Added Product",{
  closeButton: true
});
// boolean to be used in goCheckOut
this.sendIt = true;
}

setDefaultValues() {
  this.radioForm.patchValue({radioCheckForm:"1"})
}

addingPrice(num: number): number {
  let units = this.productForm.get('quantity').value;
  units = parseInt(units);
    this.controlStocks(units);
    this.myValue = units*num;
    // clean the decimals
    this.myValue = this.myValue.toFixed(2);
    console.log(this.myValue)
return  this.myValue;
}

showOfferPrice(num: number): number{
  // add to the normal price a 25% margin & can be changed at any given time
let sugarPrice: number = num + num * 0.25;
return sugarPrice;
}

controlStocks(num:number): number{
   return this.products.stock;
}

goCheckOut() {
  // user experience
(this.sendIt == false) ?  this.toastr.error("Nothing added in the cart! You have an empty cart.", "No Items added", {
closeButton: true})
                      : this.toastr.info("You are going to be redirected to checkout. Thanks for shopping with us!", "Check Out", {
closeButton: true});
// set time to redirected
setTimeout(() => {
    this.router.navigate(['/checkout']);
  }, 1500);
}

back(): void {
  // page back
  this.navigationBack.goBack();
}
// ngOnDestroy can't be used in this component as is need it to either go to products or the cart
}
