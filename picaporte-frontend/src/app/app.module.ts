import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { Auth0ServiceComponent } from './services/auth0-service/auth0-service.component';
import { HomeComponent } from './router-components/home/home.component';
import { HeaderComponent } from './layout-components/header/header.component';
import { SidenavComponent } from './layout-components/sidenav/sidenav.component';
import { CustomerComponent } from './customer-components/customer/customer.component';
import { CustomerPropertiesComponent } from './customer-components/customer-properties/customer-properties.component';
import { CustomerBusinesscardsComponent } from './customer-components/customer-businesscards/customer-businesscards.component';
import { CustomerPreferencesComponent } from './generic-components/preferences/preferences.component';
import { CustomerDashboardComponent } from './dashboard-components/customer-dashboard/customer-dashboard.component';
import { QueriesCustomerService } from './api-service/queries-customer/queries-customer.service';
import { CustomerDetailComponent } from './customer-components/customer-detail/customer-detail.component';
import { AddressComponent } from './generic-components/address/address.component';
import { RouterModule } from '@angular/router';
import { PropertyDashboardComponent } from './dashboard-components/property-dashboard/property-dashboard.component';
import { PropertyComponent } from './property-components/property/property.component';
import { PropertyDetailComponent } from './property-components/property-detail/property-detail.component';
import { PropertyCaracteristicsComponent } from './property-components/property-caracteristics/property-caracteristics.component';
import { PropertyDocumentsComponent } from './property-components/property-documents/property-documents.component';
import { PropertyImagesComponent } from './property-components/property-images/property-images.component';
import { PropertyAddressComponent } from './property-components/property-address/property-address.component';
import { PropertyObservationhistoryComponent } from './property-components/property-observationhistory/property-observationhistory.component';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { SpinnerComponent } from './utiity-components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    Auth0ServiceComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    CustomerComponent,
    CustomerPropertiesComponent,
    CustomerBusinesscardsComponent,
    CustomerPreferencesComponent,
    CustomerDashboardComponent,
    CustomerDetailComponent,
    AddressComponent,
    PropertyDashboardComponent,
    PropertyComponent,
    PropertyDetailComponent,
    PropertyCaracteristicsComponent,
    PropertyDocumentsComponent,
    PropertyImagesComponent,
    PropertyAddressComponent,
    PropertyObservationhistoryComponent,
    DashboardComponent,
    SpinnerComponent
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
  exports: [RouterModule],
  providers: [QueriesCustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
