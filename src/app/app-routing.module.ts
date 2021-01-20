import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Import License componente for routing*/
import { LicenceComponent } from './licence/licence.component';


const routes: Routes = [
  { path: 'Licence', component: LicenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
