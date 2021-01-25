import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//imports de los componentes
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LoginComponent },
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class StartRoutingModule{}
