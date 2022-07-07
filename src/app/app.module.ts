import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, viewComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllBooksComponent } from './all-books/all-books.component';
import { NavBarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { AuthenticationsService } from './Services/authentications.service';
import { BookService } from './Services/books.service';
import { NgxPaginationModule } from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import { ProductsService } from './Services/products.service';
import { UsersService } from './Services/users.service';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AllBooksComponent,
    NavBarComponent,
    LoginAndRegisterComponent,
    viewComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationsService, ProductsService, UsersService, BookService, Window],
  bootstrap: [AppComponent]
})
export class AppModule { }
