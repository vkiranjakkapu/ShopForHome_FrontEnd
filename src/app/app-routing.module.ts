import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { CartComponent } from './cart/cart.component';
import { CompletedComponent } from './completed/completed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ParticipantsComponent } from './participants/participants.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '', component: AllProductsComponent
      },
      {
        path: 'cart', component: CartComponent
      }, {
        path: 'manageproducts', component: ManageproductsComponent
      }, {
        path: 'products', component: AllProductsComponent,
        children: [
          { path: ':pid', component: ProductDetailsComponent }
        ]
      }, {
        path: 'manageproducts', component: ManageproductsComponent
      }, {
        path: 'participants', component: ParticipantsComponent
      }, {
        path: 'completed', component: CompletedComponent
      }, {
        path: 'completed/:pageId', component: CompletedComponent
      }, {
        path: 'wishlist', component: WishlistComponent
      }, {
        path: 'wishlist/:pageId', component: CompletedComponent
      }, {
        path: 'book/:bookId', component: BookdetailsComponent
      }, {
        path: 'book/:bookId/:bookName', component: BookdetailsComponent
      }
    ]
  },
  {
    path: 'products', component: AllProductsComponent,
    children: [
      { path: ':pid', component: ProductDetailsComponent }
    ]
  },
  { path: 'books', component: AllBooksComponent },
  { path: 'books/:pageId', component: AllBooksComponent },
  { path: 'book/:bookId', component: BookdetailsComponent },
  { path: 'book/:bookId/:bookName', component: BookdetailsComponent },
  { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const viewComponents = [AllBooksComponent, AllProductsComponent, CartComponent, ProductDetailsComponent, ManageproductsComponent, ParticipantsComponent, WishlistComponent, CompletedComponent, BookdetailsComponent, NotFoundComponent, DashboardComponent];