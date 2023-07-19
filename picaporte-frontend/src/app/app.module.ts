import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer  } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Imported components
import { DragulaModule } from 'ng2-dragula';
import { LightboxModule } from 'ngx-lightbox';
import { CKEditorModule } from 'ckeditor4-angular';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

import { Auth0ServiceComponent } from './services/auth0-service/auth0-service.component';
import { SidenavComponent } from './layout-components/sidenav/sidenav.component';
import { CustomerComponent } from './customer-components/customer/customer.component';
import { CustomerPropertiesComponent } from './customer-components/customer-properties/customer-properties.component';
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
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { SpinnerComponent } from './utiity-components/spinner/spinner.component';
import { PropertyOnlineComponent } from './property-components/property-online/property-online.component';
import { Auth0Component } from './auth0/auth0.component';
import { PropertyRentingComponent } from './property-components/property-renting/property-renting.component';
import { StaticDataComponent } from './router-components/static-data/static-data.component';
import { DashboardKpiComponent } from './generic-components/dashboard-kpi/dashboard-kpi.component';
import { SearchAndFilterBarComponent } from './generic-components/search-and-filter-bar/search-and-filter-bar.component';
import { ActivityLogComponent } from './generic-components/activity-log/activity-log.component';
import { UserComponent } from './user-components/user/user.component';
import { UserDashboardComponent } from './dashboard-components/user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './user-components/user-detail/user-detail.component';
import { NewsComponent } from './router-components/news/news.component';
import { ToDosComponent } from './router-components/to-dos/to-dos.component';
import { MessageComponent } from './generic-components/message/message.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { GoogleMapComponent } from './generic-components/google-map/google-map.component';
import { DateFormatComponent } from './generic-components/date-format/date-format.component';
import { RecommendedPropertiesComponent } from './property-components/recommended-properties/recommended-properties.component';
import { CommaToDotDirective } from './generic-components/comma-to-dot.directive';
import { TasksComponent } from './router-components/tasks/tasks.component';
import { TaskComponent } from './property-components/property/task/task.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    Auth0ServiceComponent,
    SidenavComponent,
    CustomerComponent,
    CustomerPropertiesComponent,
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
    DashboardComponent,
    SpinnerComponent,
    PropertyOnlineComponent,
    Auth0Component,
    PropertyRentingComponent,
    StaticDataComponent,
    DashboardKpiComponent,
    SearchAndFilterBarComponent,
    ActivityLogComponent,
    UserComponent,
    UserDashboardComponent,
    UserDetailComponent,
    NewsComponent,
    ToDosComponent,
    MessageComponent,
    GoogleMapComponent,
    DateFormatComponent,
    RecommendedPropertiesComponent,
    CommaToDotDirective,
    TasksComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LightboxModule,
    CKEditorModule,
    DragulaModule.forRoot(),
    AuthModule.forRoot({
      domain: 'REDACTED_AUTH0_DOMAIN',
      clientId: 'REDACTED_AUTH0_CLIENT_ID',
      //domain: 'REDACTED_AUTH0_DOMAIN_OLD',
      //clientId: 'REDACTED_AUTH0_CLIENT_ID_OLD',
      authorizationParams: {
        redirect_uri: environment.redirectUri
      }
    }),
  ],
  exports: [
    RouterModule,
    NewsComponent
  ],
  providers: [
    QueriesCustomerService,
    {provide: LOCALE_ID, useValue: 'pt'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
