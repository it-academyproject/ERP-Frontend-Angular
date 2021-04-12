import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { faCartPlus, faClipboardCheck, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

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

  // selectors
  plusOne: HTMLElement = document.querySelector('#plusToBuy');
  minusOne: HTMLElement = document.querySelector('#minusToBuy');
  numberUnits: string | number | any;

  // reactive form
  getUnitsInput = new FormGroup({
    numberUnits: new FormControl('1')
  });


  constructor(private productsService: ProductsService) { }

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

  getValueUnits(){
console.log(this.getUnitsInput.get('numberUnits').value);
  }


}
