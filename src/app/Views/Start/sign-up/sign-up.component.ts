import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserSignUpDto } from 'src/app/Models/DTOs/newUserDto';
import { CountriesService } from 'src/app/Services/countries.service';

//import services
import { SignupService } from '../../../Services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  regexCIF = /^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/;
  regexDNI: RegExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
  regexDNICIF: RegExp = /^[0-9a-zA-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
  // i stands for insensitive for upper or lower
  regexEmail = /^[a-z0-9._%+-]+@[a-z0-9·-]+.[a-z]{2,4}$/;

  new_user: UserSignUpDto;

  countryInfo: any[] = [];
  provinceInfo: any[] = [];
  cityInfo: any[] = [];

  closeResult = '';

  // answer errors
  errorMessage: string = '';
  errorMessageMaps: string = '';
  myError: boolean = false;

  // placeholders
  placeholder = {
    name: 'First Name',
    surname: 'Last Name',
    id: 'Fiscal number or ID',
    address: 'Street',
    number: 'Number',
    email: 'Email',
    password: 'Password',
    checkPass: 'Repeat password',
  };

  constructor(
    private modalService: NgbModal,
    private signupService: SignupService,
    private fb: FormBuilder,
    private country: CountriesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getCountries();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
      inputSurname: ['', [Validators.required, Validators.minLength(3)]],
      address: this.fb.group({
        inputAddress: ['', Validators.required],
        inputNumber: ['', Validators.required],
        inputCity: ['', [Validators.required, Validators.minLength(2)]],
        inputCountry: ['', Validators.required],
        inputProvince: ['', Validators.required],
        inputZIP: ['', Validators.required],
      }),
      inputDNI: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexDNICIF),
          this.checkDNI,
        ],
      ],
      inputEmail: [
        '',
        [Validators.required, Validators.pattern(this.regexEmail)],
      ],
      inputPassword: ['', this.checkPassStrength],
      inputRepeatPass: ['', Validators.required],
    });
  }

  onSubmit() {
    const name_and_surname =
      this.signUpForm.value.inputName +
      ' ' +
      this.signUpForm.value.inputSurname;
    this.new_user = new UserSignUpDto(
      this.signUpForm.value.inputDNI,
      'url',
      name_and_surname,
      this.signUpForm.value.inputPassword,
      this.signUpForm.value.inputEmail,
      {
        id: '',
        street: this.signUpForm.value.address.inputAddress,
        number: this.signUpForm.value.address.inputNumber,
        city: this.signUpForm.value.address.inputCity,
        country: this.signUpForm.value.address.inputCountry,
        zipcode: this.signUpForm.value.address.inputZIP,
      }
    );
    this.signupService.createUser(this.new_user).subscribe(
      (resp) => {
        console.log(resp);
        this.toastr.success(
          'User created successfully. You`ll be re-directed to Home page',
          'New User',
          {
            closeButton: true,
          }
        );
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
        this.myError = true;
        return err;

        /* if ( err instanceof HttpErrorResponse) {
          if (err.status === 422) {
           // this.errorMessage = err.error.message;
           this.errorMessage = "The user already exists in the database.";
          }
        } */
      }
    );
  }

  checkPassStrength(inputPass) {
    const password = inputPass.value;

    const uppercase = '[A-Z]';
    const lowercase = '[a-z]';
    const numbers = '[0-9]';
    const symbols = '[*.!@#$%^&(){}[]:;<>,.?/~_+-=|]';
    const minLength = 8;
    const maxLength = 16;
    let count = 1;
    const minControlPassed = 5;

    // RegEx
    let regex = [];
    regex.push(uppercase); // Add uppercase control
    regex.push(lowercase); // Add lowercase control
    regex.push(numbers); // Add numbers control
    regex.push(symbols); // Add symbols control

    // Validate Strength
    if (password.length >= minLength && password.length <= maxLength) {
      count++;
      for (let i = 0; i < regex.length; i++) {
        if (new RegExp(regex[i]).test(password) && count < minControlPassed) {
          count++;
        } else if (count >= minControlPassed) {
          return null;
        } else {
          return {
            checkPassStrength:
              'The password requires at least one number, uppercase and lowercase letters and one special character.',
          };
        }
      }
    } else {
      return {
        checkPassStrength:
          'The password must be at least 8 characters long, but no more than 16',
      };
    }
  }

  showPassword(inputPass: string, eyeIcon: string) {
    let inputPassword: HTMLInputElement = <HTMLInputElement>(
      document.getElementById(inputPass)
    );
    let icon: HTMLInputElement = <HTMLInputElement>(
      document.getElementById(eyeIcon)
    );

    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else if (inputPassword.type === 'text') {
      inputPassword.type = 'password';
      icon.classList.add('fa-eye-slash');
      icon.classList.remove('fa-eye');
    }
  }

  isValidInput(name: string): boolean {
    const input: any = this.signUpForm.get(name);
    return input.touched && input.invalid;
  }

  matchPasswords() {
    const pass1 = this.signUpForm.get('inputPassword').value;
    const pass2 = this.signUpForm.get('inputRepeatPass').value;

    return pass1 === pass2 ? false : true;
  }

  checkDNI(control: FormControl) {
    let idControl = control.value;
    let regexDNI: RegExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    let regexCIF: RegExp = /^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/;
    let vowel: RegExp = /[a-zA-Z]/;

    if (control.pristine || idControl == '') return null;
    if (vowel.test(idControl)) return null;

    while (!regexDNI.test(idControl) && !regexCIF.test(idControl)) {
      return {
        dniDomain: {
          parsedIdControl: idControl,
        },
      };
    }
    return null;
  }

  getCountries() {
    this.country.allCountries().subscribe(
      (data) => {
        this.countryInfo = data.Countries;
      },
      (err) => {
        console.log(err);
        if (err.error instanceof Error) {
          this.errorMessageMaps = err.error.message;
        } else {
          this.errorMessageMaps = err.error.message;
        }
      }
    );
  }

  onChangeCountry(inputCountry) {
    this.provinceInfo = this.countryInfo[inputCountry].States;
    this.cityInfo = this.provinceInfo[0].Cities;
  }

  onChangeProvince(inputProvince) {
    this.cityInfo = this.provinceInfo[inputProvince].Cities;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): any {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
