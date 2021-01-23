import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import local modules
import { StartModule } from './Views/Start/start.module';


import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './Components/header/header.component';
import { AdminComponent } from './Components/header/admin/admin.component';
import { NotificationsComponent } from './Components/header/notifications/notifications.component';
import { HeaderSearchComponent } from './Components/header/header-search/header-search.component';
import { TogglerComponent } from './Components/header/toggler/toggler.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarClientComponent } from './Components/navbar-client/navbar-client.component';
import { ProductsListComponent } from './views/products-list/products-list.component';
// import { RecoverPasswordComponent } from './Views/Start/recover-password/recover-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    NotificationsComponent,
    HeaderSearchComponent,
    TogglerComponent,
    NavbarClientComponent,
    NavbarClientComponent,
    ProductsListComponent
      // RecoverPasswordComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    StartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
