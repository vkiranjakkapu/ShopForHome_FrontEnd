import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../Entities/book.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { BookService } from '../Services/books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  public page = 1;
  public thisPage: string = "Store Books";
  public records: number[] = [6, 12, 18, 24, 30, 36];
  public perPage: number = this.records[1];
  // public books: Book[];
  public isLoggedIn: boolean = false;

  constructor(private _authService: AuthenticationsService, private _bookService: BookService, private router: Router, private _activeRouter: ActivatedRoute) {
    // this.books = _bookService.getBooks();
    // _activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    // this.books = this._bookService.getBooks();
    // this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    if (this._authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  // selectPage(page: string) {
  //   this.page = parseInt(page, 10) || 1;
  // }

  // getPathVariables(pathVars: any) {
  //   if (pathVars.pageId != undefined) {
  //     this.page = pathVars.pageId;
  //   }
  // }

  // modifyWishlist(id: any) {
  //   this._bookService.modifyWishlist(id);
  // }

  // inWishlist(id: any): boolean {
  //   return this._bookService.inWishlist(id);
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
