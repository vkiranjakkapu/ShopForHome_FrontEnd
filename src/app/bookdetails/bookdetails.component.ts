import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../Entities/book.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { BookService } from '../Services/books.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  
  public thisPage: string = "";
  public bookName: any;
  public bookId: any;
  public book: Book | undefined;
  
  constructor(private _bookService: BookService, private _authService: AuthenticationsService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data: any)=>{ this.getPathVariables(data) });
    // this.book = this._bookService.getBookById(this.bookId);
  }

  getPathVariables(pathVars: any) {    
    if (pathVars.bookName != undefined) {
      this.bookName = pathVars.bookName;
    }
    if (pathVars.bookId != undefined) {
      this.bookId = pathVars.bookId;
    }
  }
}
