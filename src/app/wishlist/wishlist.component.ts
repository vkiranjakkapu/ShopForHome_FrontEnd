import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationsService } from '../Services/authentications.service';
import { BookService } from '../Services/books.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public thisPage: string = "Your Wishlist";
  public page: number = 1;
  public records: number[] = [6, 12, 18, 24, 30, 36];
  public perPage: number = this.records[1];
  public wishList: any;
  public isLoggedIn: boolean = false;
  
  constructor(private _authService: AuthenticationsService, private _bookService: BookService, private router: Router, private _activeRouter: ActivatedRoute) {
    // _activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    // this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    // this.wishList = this._authService.getCurrentUser()?.getWishList()?.map((bid)=>{return this._bookService.getBookById(bid)});
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  // getPathVariables(pathVars: any) {    
  //   if (pathVars.pageId != undefined) {
  //     this.page = pathVars.pageId;
  //   }
  // }

  // inWishlist(id: any): boolean {
  //   return this._bookService.inWishlist(id);
  // }

  // modifyWishlist(id: any) {
  //   this._bookService.modifyWishlist(id);
  //   this.wishList = this._authService.getCurrentUser()?.getWishList()?.map((bid)=>{return this._bookService.getBookById(bid)});
  // }

  // modifyCompleted(id: any) {
  //   this._bookService.modifyCompleted(id);
  // }

  // inCompleted(id: any): boolean {
  //   return this._bookService.inCompleted(id);
  // }

  // openBookDetails(bid: any, e: any) {
  //   if (e.target.nodeName != 'BUTTON') {
  //     if (this.isLoggedIn) {
  //       this.router.navigate(['dashboard', 'book', bid]);
  //     } else {
  //       this.router.navigate(['book', bid]);
  //     }
  //   }
  // }

}
