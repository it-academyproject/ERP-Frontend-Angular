import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { faCartPlus, faClipboardCheck, faEuroSign, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.scss', 'singleStyle.scss']
})
export class SingleProductViewComponent implements OnInit {

  products: any;
  id: number;
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
  myValue1: any;
  // reactive form
  getUnitsInput = new FormGroup({
    numberUnits: new FormControl('1')
  });

  getPrice = new FormGroup({
    totalPrice: new FormControl()
  })

  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService) { }

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

  toShoppingCard(){
    // add to the basket
this.shoppingCartService.addItem(this.products);
console.log(this.getUnitsInput.get('numberUnits').value);
  }
addingPrice() {
  let units = this.getUnitsInput.get('numberUnits').value;
  let price = this.getPrice.get('totalPrice').value;
console.log(units);
console.log(price);
  this.products.price = units*price;
  console.log(this.products.price);
}
}
