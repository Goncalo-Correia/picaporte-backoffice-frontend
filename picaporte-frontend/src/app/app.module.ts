import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { Auth0ServiceComponent } from './auth0-service/auth0-service.component';
import { HomeComponent } from './router-components/home/home.component';
import { HeaderComponent } from './layout-components/header/header.component';
import { SidenavComponent } from './layout-components/sidenav/sidenav.component';
import { CustomerComponent } from './customer-components/customer/customer.component';
import { CustomerAddressComponent } from './customer-components/customer-address/customer-address.component';
import { CustomerPropertiesComponent } from './customer-components/customer-properties/customer-properties.component';
import { CustomerBusinesscardsComponent } from './customer-components/customer-businesscards/customer-businesscards.component';
import { CustomerPreferencesComponent } from './customer-components/customer-preferences/customer-preferences.component';
import { CustomerDashboardComponent } from './dashboard-components/customer-dashboard/customer-dashboard.component';
import { QueriesCustomerService } from './api-service/queries-customer/queries-customer.service';


@NgModule({
  declarations: [
    AppComponent,
    Auth0ServiceComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    CustomerComponent,
    CustomerAddressComponent,
    CustomerPropertiesComponent,
    CustomerBusinesscardsComponent,
    CustomerPreferencesComponent,
    CustomerDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'REDACTED_AUTH0_DOMAIN_OLD',
      clientId: 'REDACTED_AUTH0_CLIENT_ID_OLD'
    })
  ],
  providers: [QueriesCustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
