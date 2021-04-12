import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.scss', 'singleStyle.scss']
})
export class SingleProductViewComponent implements OnInit {

  products: any;
  id: number;
   //Icons
   faTrashAlt = faTrashAlt;
   faEdit = faEdit;

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

}
