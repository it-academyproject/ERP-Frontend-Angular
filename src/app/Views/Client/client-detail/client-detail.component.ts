import { Clients } from './../../../Models/clients';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/Services/clients.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { getSourceFileOrError } from '@angular/compiler-cli/src/ngtsc/file_system';
import { stringify } from '@angular/compiler/src/util';
import { RespClients } from '../../../Models/ReqResClients'

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  // TODO: Create Interface for client object?
  id             : string;
  name           : string;
  street         : string;
  number         : string;
  zip            : string;
  city           : string;
  country        : string;
  cif            : string;
  image          : string;

  showAlert      : boolean = false;
  success        : boolean = false;
  alertMessage   : string;

  form: FormGroup;

  constructor(private clientsService: ClientsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    //Recuperamos el parámetro (id) del cliente y cargamos su info
    this.activatedRoute.params.subscribe( params => {
      this.loadClient(params['id']);
    });

  }

  createForm() {
    this.form = this.fb.group({
      // name: [this.name, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      // address: [this.address, [Validators.required, Validators.maxLength(50)]],
      // cif: [this.cif, [Validators.required, Validators.maxLength(10)]]
      name    : [this.name, [Validators.required]],
      street  : [this.street, [Validators.required]],
      number  : [this.number, [Validators.required]],
      zip     : [this.zip, [Validators.required]],
      city    : [this.city, [Validators.required]],
      country : [this.country, [Validators.required]],
      cif     : [this.cif, [Validators.required]]
    });
  }

  get isNameInvalid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  get isStreetInvalid() {
    return this.form.get('street').invalid && this.form.get('street').touched;
  }
  get isNumberInvalid() {
    return this.form.get('number').invalid && this.form.get('number').touched;
  }
  get isZipInvalid() {
    return this.form.get('zip').invalid && this.form.get('zip').touched;
  }
  get isCityInvalid() {
    return this.form.get('city').invalid && this.form.get('city').touched;
  }
  get isCountryInvalid() {
    return this.form.get('country').invalid && this.form.get('country').touched;
  }
  get isCIFInvalid() {
    return this.form.get('cif').invalid && this.form.get('cif').touched;
  }


  submit() {
    if (this.form.invalid) {
      // Si el form es inválido, márcamos los controles como "touched" para que se marquen/muestren los errores
      return Object.values(this.form.controls).forEach( control => {
        control.markAsTouched();
      });
    }

    this.updateClient();
  }

  loadClient(id: string) {
    this.clientsService.getClientByID(id)
      .subscribe( (data:RespClients) => {
        if (!data) {
          this.router.navigateByUrl('client-list'); // redirect to client-list
        } else {
          this.id      = data.client.id; //Guardamos el ID para poder usarlo en todo el componente (necesario para update y delete)
          this.name    = data.client.name_and_surname;
          this.street  = data.client.address.street;
          this.number  = data.client.address.number;
          this.zip     = data.client.address.zipcode;
          this.city    = data.client.address.city;
          this.country = data.client.address.country;
          this.cif     = data.client.dni;
          this.image   = data.client.image;

          this.form.get("name").setValue(this.name);
          this.form.get("street").setValue(this.street);
          this.form.get("number").setValue(this.number);
          this.form.get("zip").setValue(this.zip);
          this.form.get("city").setValue(this.city);
          this.form.get("country").setValue(this.country);
          this.form.get("cif").setValue(this.cif);


        }
      }, (err) => {
        console.log(err);
        // this.showAlert = true;
        // this.success = false;
        // this.returnMessage = err.error;
      }) //Llamamos al servicio que accede a la API para recuperar la info del cliente y lo movemos a la propiedad product para que se cargue en la vista
  }

  updateClient() {
    const client = {
      id               : this.id,
      name_and_surname : this.form.get("name").value,

      dni              : this.form.get("cif").value,
      image            : this.image,
      address           :{
        street           : this.form.get("street").value,
        number           : this.form.get("number").value,
        city             : this.form.get("city").value,
        zipcode          : this.form.get("zip").value,
        country          : this.form.get("country").value,

      }
    };


    this.clientsService.updateClient(client)
    .subscribe(resp => {

      this.showAlert = true;
      this.success = true;
      this.alertMessage = 'Client updated!!!'

      // let alert show up and then redirect
      setTimeout(() => {
        this.showAlert = false; // alert OK
        this.alertMessage = ''
      }, 2000);
    }, (err) => {
      // console.log(err);
      this.showAlert = true;
      this.success = false;
      this.alertMessage = err.error.message;
    });
  }

  deleteClient() {
    this.clientsService.deleteClient(this.id)
    .subscribe(resp => {
      this.showAlert = true;
      this.success = true;
      this.alertMessage = 'Client deleted!!!';


      // let alert show up and then redirect
      setTimeout(() => {
        this.showAlert = false; // alert OK
        this.alertMessage = '';
        this.router.navigateByUrl('client-list'); // redirect to client-list
      }, 2000);
    }, (err) => {
      console.log(err);
      this.showAlert = true;
      this.success = false;
      this.alertMessage = err.error;
    });
  }
}
