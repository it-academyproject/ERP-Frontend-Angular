export class UserSignUpDto {
  dni             : string; 
  image           : string;
  name_and_surname: string;
  password        : string;
  username        : string;
  address         : string;
    street  : string;
    number  : string;
    city    : string;
    country : string;
    zipcode : string;
  shipping_address?: string;
  user_type        : string;


  constructor(newClient) {
    this.dni = newClient.inputDNI;
    this.image = '';
    this.name_and_surname = `${newClient.inputName} ${newClient.inputSurname}`;
    this.password = newClient.inputPassword;
    this.username = newClient.inputEmail;
    this.address = `${newClient.address.inputAddress} ${newClient.address.inputCity} ${newClient.address.inputProvince} ${newClient.address.inputZIP} ${newClient.address.inputCountry}`;
    this.user_type = 'CLIENT'
  }

}
