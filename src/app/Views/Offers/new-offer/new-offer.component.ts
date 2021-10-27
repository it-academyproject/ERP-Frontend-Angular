import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { OffersService } from 'src/app/Services/offers.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss']
})
export class NewOfferComponent implements OnInit {
  id: string;
  description: string;
  discount: number;
  start_date: string;
  end_date: string;
  paid_quantity: number;
  free_quantity: number;

  showAlert: boolean = false;
  success: boolean = false;
  alertMessage: string;
  errorAPI:boolean;
 
  token:string;
  url: string = 'http://217.76.158.200:8080';
  endPoint: string = '/api/offers';

  form: FormGroup;
  dateForm: FormGroup;

  endLessStart: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private offersService: OffersService,
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService

  ) { 
    //Accedemos al servicio de login para recuperar el token que se ha guardado
    this.token = this.loginService.getBearerToken;

    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      description: [this.description, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      discount: [this.discount, [Validators.required]],
      start_date: [this.start_date, [Validators.required]],
      end_date: [this.end_date, [Validators.required]],
      paid_quantity: [this.paid_quantity, [Validators.required]],
      free_quantity: [this.free_quantity, [Validators.required]]
    });
  }

  get isDescriptionInvalid() {
    return this.form.get('description').invalid && this.form.get('description').touched;
  }
  get isDiscountInvalid() {
    return this.form.get('discount').invalid && this.form.get('discount').touched;
  }
  get isStartDateInvalid() {
    return this.form.get('start_date').invalid && this.form.get('start_date').touched;
  }
  get isEndDateInvalid() {
    return this.form.get('end_date').invalid && this.form.get('end_date').touched;
  }
  get isPaidQuantityInvalid() {
    return this.form.get('paid_quantity').invalid && this.form.get('paid_quantity').touched;
  }
  get isFreeQuantityInvalid() {
    return this.form.get('free_quantity').invalid && this.form.get('free_quantity').touched;
  }

  submit() {
    let from = this.form.get('start_date').value;
    let to = this.form.get('end_date').value;
    this.dateLessThan(from, to);
    if (this.form.invalid || this.endLessStart) {
      // Si el form es inválido, márcamos los controles como "touched" para que se marquen/muestren los errores
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    else{
      this.createOffer();
    }
  }

  dateLessThan(from:string, to:string) {
    this.endLessStart = false;

    let exp = /[\W]+/;
    let partStart = from.split(exp);
    let partEnd = to.split(exp);
    let startDate = new Date(parseInt(partStart[2], 10),
                    parseInt(partStart[1], 10) - 1,
                    parseInt(partStart[0], 10));
    let endDate = new Date(parseInt(partEnd[2], 10),
                    parseInt(partEnd[1], 10) - 1,
                    parseInt(partEnd[0], 10));  
    
    const timestampStart = startDate.getTime();
    const timestampEnd = endDate.getTime();
             
    if(timestampEnd < timestampStart){
        this.showAlert = true;
        this.success = true;
        this.alertMessage = 'Wrong dates!!!';
        this.endLessStart = true;
        return this.endLessStart;
    }
  }

  createOffer(){
    let newOffer = {
      id: this.id,
      name: this.form.get('description').value,
      discount: this.form.get('discount').value,
      start_date: `${this.form.get('start_date').value}${" "}${"00:00:00"}`,
      end_date: `${this.form.get('end_date').value}${" "}${"00:00:00"}`,
      paid_quantity: this.form.get('paid_quantity').value,
      free_quantity: this.form.get('free_quantity').value,
    }//Pasamos los datos de a oferta

    this.offersService.createOffer(newOffer)
    .subscribe(
      ( offer: any ) => {
        this.errorAPI = false;
        this.showAlert = true;
        this.success = offer.success;
        this.alertMessage = 'Offer created!!!';        
      },
       ( errorServicio ) => {
        this.errorAPI = true;
        console.log(errorServicio);
      });
  }
}
