import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, viewComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { AuthenticationsService } from './Services/authentications.service';
import { NgxPaginationModule } from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import { ProductsService } from './Services/products.service';
import { UsersService } from './Services/users.service';
import { CartService } from './Services/cart.service';
import { WishlistService } from './Services/wishlist.service';
import { OrderService } from './Services/order.service';
import { Ng2OrderModule, Ng2OrderPipe } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CouponService } from './Services/coupon.service';
import { ReportsService } from './Services/reports.service';

@NgModule({
  declarations: [
    AppComponent,
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
    Ng2OrderModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthenticationsService, ReportsService, ProductsService, CouponService, UsersService, CartService, WishlistService, OrderService, Window],
  bootstrap: [AppComponent]
})
export class AppModule { }
