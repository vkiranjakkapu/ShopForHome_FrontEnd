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
import { CartService } from './Services/cart.service';
import { WishlistService } from './Services/wishlist.service';
import { OrderService } from './Services/order.service';
import { OrdersComponent } from './orders/orders.component';
import { Ng2OrderModule, Ng2OrderPipe } from 'ng2-order-pipe';

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
    HttpClientModule,
    Ng2OrderModule
  ],
  providers: [AuthenticationsService, ProductsService, UsersService, CartService, WishlistService, OrderService, BookService, Window],
  bootstrap: [AppComponent]
})
export class AppModule { }
