import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { CartComponent } from './cart/cart.component';
import { CompletedComponent } from './completed/completed.component';
import { CouponsComponent } from './coupons/coupons.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ParticipantsComponent } from './participants/participants.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReportsComponent } from './reports/reports.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '', component: AllProductsComponent
      }, {
        path: 'cart', component: CartComponent
      }, {
        path: 'wishlist', component: WishlistComponent
      }, {
        path: 'manageproducts', component: ManageproductsComponent
      }, {
        path: 'orders', component: OrdersComponent
      }, {
        path: 'orders/:pid', component: OrdersComponent
      }, {
        path: 'orders/:pid/:itemsCount', component: OrdersComponent
      }, {
        path: 'coupons', component: CouponsComponent
      }, {
        path: 'products', component: AllProductsComponent
      }, {
        path: 'products/:pid', component: ProductDetailsComponent
      }, {
        path: 'manageproducts', component: ManageproductsComponent
      }, {
        path: 'reports', component: ReportsComponent
      }, {
        path: 'participants', component: ParticipantsComponent
      }, {
        path: 'wishlist', component: WishlistComponent
      }, {
        path: 'wishlist/:pageId', component: CompletedComponent
      }
    ]
  },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:pid', component: OrdersComponent },
  { path: 'products', component: AllProductsComponent },
  { path: 'products/:pid', component: ProductDetailsComponent },
  { path: '404', component: NotFoundComponent },
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const viewComponents = [AllBooksComponent, ReportsComponent, CouponsComponent, AllProductsComponent, OrdersComponent, CartComponent, ProductDetailsComponent, ManageproductsComponent, ParticipantsComponent, WishlistComponent, CompletedComponent, BookdetailsComponent, NotFoundComponent, DashboardComponent, PagenotfoundComponent];