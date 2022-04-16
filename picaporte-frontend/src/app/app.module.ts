import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { Auth0ServiceComponent } from './auth0-service/auth0-service.component';
import { HomeComponent } from './router-components/home/home.component';
import { HeaderComponent } from './layout-components/header/header.component';
import { SidenavComponent } from './layout-components/sidenav/sidenav.component';
import { FooterComponent } from './layout-components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    Auth0ServiceComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'REDACTED_AUTH0_DOMAIN_OLD',
      clientId: 'REDACTED_AUTH0_CLIENT_ID_OLD'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
