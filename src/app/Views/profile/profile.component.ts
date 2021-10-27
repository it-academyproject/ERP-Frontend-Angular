import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/Services/file-upload.service';
import { UserService } from 'src/app/Services/user.service';

import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public imgUpload: File;
  public imgTemp: any = null;



  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService ) {

      this.user = userService.user;

  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      username: [ this.user.username, Validators.required ],
      email: [ this.user.email, [ Validators.required, Validators.email] ],
    });
    
  }

  updateProfile () {
    this.userService.updateProfile ( this.profileForm.value)
    .subscribe( () => {
      const { username, email } = this.profileForm.value;
      this.user.username = username;
      this.user.email = email;

      console.log(username);
      console.log(email);

    })
   
  }

  changeImg( file: File ) {
    this.imgUpload = file;

    if ( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  uploadImg() {

    this.fileUploadService
      .actualizarFoto( this.imgUpload, this.user.uid )
      .then( img => {
        this.user.img = img;
        console.log('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
      })

  }
}
