import { Injectable } from '@angular/core';
import { Data } from '../Resources/data';
import { Book } from '../Entities/book.model';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class BookService extends Data {

  constructor(private _authService: AuthenticationsService) {
    super();
  }

  // getBooks(): Book[] {
  //   return this.Books;
  // }

  // getBookById(id: number) {
  //   return this.Books.find(function (book) { return (book.getId() == id) });
  // }

  // inWishlist(id: any): boolean {
  //   return (this._authService.getCurrentUser()?.getWishList()?.indexOf(id) != -1) ? true : false;
  // }

  // modifyWishlist(id: any): boolean {
  //   let wishlist = this._authService.getCurrentUser()?.getWishList();
  //   let status: boolean = true;
  //   if (this.inWishlist(id)) {
  //     wishlist?.splice(wishlist?.indexOf(id, 1));
  //     window.alert('Book removed from Wishlist');
  //   } else {
  //     if (this.getBookById(id) != undefined) {
  //       wishlist?.push(id);
  //       window.alert('Book added to Wishlist');
  //     } else {
  //       window.alert("Book Not Found!");
  //       status = false;
  //     }
  //   }
  //   this._authService.getCurrentUser()?.setWishList(wishlist);
  //   return status;
  // }

  // inCompleted(id: any): boolean {
  //   return (this._authService.getCurrentUser()?.getCompleted()?.indexOf(id) != -1) ? true : false;
  // }

  // modifyCompleted(id: any): boolean {
  //   let completed = this._authService.getCurrentUser()?.getCompleted();
  //   let status: boolean = true;
  //   if (this.inCompleted(id)) {
  //     completed?.splice(completed?.indexOf(id, 1));
  //     window.alert('Book removed from Completed');
  //   } else {
  //     if (this.getBookById(id) != undefined) {
  //       completed?.push(id);
  //       window.alert('Book added to Completed');
  //     } else {
  //       window.alert("Book Not Found!");
  //       status = false;
  //     }
  //   }
  //   this._authService.getCurrentUser()?.setCompleted(completed);
  //   return status;
  // }
}
