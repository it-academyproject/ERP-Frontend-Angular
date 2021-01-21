import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LicenceComponent } from './Components/footer/licence/licence.component';
import { NavbarClientComponent } from './Components/navbar-client/navbar-client.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LicenceComponent,
    NavbarClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
