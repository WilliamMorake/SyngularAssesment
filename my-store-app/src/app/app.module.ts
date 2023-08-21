import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StoreLandingComponent } from './store-landing/store-landing.component';
import { CartComponent } from './cart/cart.component';
import { ClienDetailsComponent } from './clien-details/clien-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StoreLandingComponent,
    CartComponent,
    ClienDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
