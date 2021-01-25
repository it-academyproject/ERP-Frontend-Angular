import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartRoutingModule } from './start-routing.module';

//import components
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    RecoverPasswordComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StartRoutingModule
  ],
  // REMEMBER: declare but also export Components to make them accessible to the whole app
  exports: [RecoverPasswordComponent, LoginComponent, SignUpComponent],
})
export class StartModule {}
