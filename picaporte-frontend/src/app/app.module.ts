import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ErrorInterceptor } from './interceptors/auth.interceptor';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { environment } from 'src/environments/environment';

import { Auth0ServiceComponent } from './services/auth0-service/auth0-service.component';
import { SidenavComponent } from './layout-components/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { Auth0Component } from './auth0/auth0.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    Auth0ServiceComponent,
    SidenavComponent,
    DashboardComponent,
    Auth0Component,
    LoginComponent,
    AccessDeniedComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience
      },
      errorPath: '/forbidden',
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.apiUrl}api/*`,
            tokenOptions: {
              authorizationParams: {
                audience: environment.auth0.audience
              }
            }
          }
        ]
      }
    })
  ],
  exports: [RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
