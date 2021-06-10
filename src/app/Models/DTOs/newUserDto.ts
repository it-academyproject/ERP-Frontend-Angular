export class UserSignUpDto {
  public dni               : string; 
  public image             : string;
  public name_and_surname  : string;
  public password          : string;
  public username          : string;
  public address           : Address;
  public shipping_address? : Address;
  user_type         : string;


  constructor(newClient) {
    this.dni = newClient.inputDNI;
    this.image = '';
    this.name_and_surname = `${newClient.inputName} ${newClient.inputSurname}`;
    this.password = newClient.inputPassword;
    this.username = newClient.inputEmail;
   // this.address = `${newClient.address.inputAddress} ${newClient.address.inputCity} ${newClient.address.inputProvince} ${newClient.address.inputZIP} ${newClient.address.inputCountry}`;
    this.user_type = 'CLIENT'
  }

}

export class Address {
  street  :  string;
  number  :  string;
  city    :  string;
  country :  string;
  zipcode :  string;

  constructor(street, number, city, zipcode, country){
    this.street   = street.inputAddress;
    this.number   = number.inputNumber;
    this.city     = city.inputCity;
    this.zipcode  = zipcode.inputZipCode;
    this.country  = country.inputCountry;

  }
 
}
