import { Component, EventEmitter, OnInit } from '@angular/core';
import { faCartPlus, faClipboardCheck, faEuroSign, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
// services
import { ProductsService } from 'src/app/Services/products.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.scss', 'singleStyle.scss']
})
export class SingleProductViewComponent implements OnInit {
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

        // reactive form with form Control
          /* productForm = new FormGroup({
            quantity: new FormControl('1'),
            totalPrice: new FormControl()
          }); */

// declaration reactive form with formBuilder
productForm: FormGroup;

  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService,
              private formBuilder: FormBuilder) {
// reactive form group Builder
this.productForm = this.formBuilder.group({
  quantity: ['1', Validators.pattern('^[0-9]+$')],
  totalPrice: ['3', Validators.pattern('^[0-9]+$')]
})
               }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe(
        (data: any) => {
          this.products = data.products[0];
          console.log(this.products);
        },
        error => {
          console.log(error);
        });



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
