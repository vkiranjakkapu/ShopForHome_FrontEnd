import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { CartComponent } from './cart/cart.component';
import { CouponsComponent } from './coupons/coupons.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
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
      }
    ]
  },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:pid', component: OrdersComponent },
  { path: 'products', component: AllProductsComponent },
  { path: 'products/:pid', component: ProductDetailsComponent },
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
export const viewComponents = [ReportsComponent, CouponsComponent, AllProductsComponent, OrdersComponent, CartComponent, ProductDetailsComponent, ManageproductsComponent, ParticipantsComponent, WishlistComponent, DashboardComponent, PagenotfoundComponent];