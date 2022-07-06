import { Book } from "../Entities/book.model";
import { User } from "../Entities/user.model";
import data from 'data.json';

export class Data {
    
  // protected Books: Book[] = data.Books.map(book => new Book(book.id, book.author, book.country, book.imageLink, book.language, book.link, book.pages, book.title, book.year));
  // protected Users: User[] = data.Users.map(user => new User(user.id, user.userName, user.Password, user.Phone, user.Email, user.UserType, user.WishList, user.Completed));
  protected Books: Book[] = [];
  protected Users: User[] = [];

  constructor() {
    let localUser: any = localStorage.getItem('localUsersToken');
    if (localUser != null) {
      JSON.parse(atob(localUser)).users.map((user: any) => this.Users.push(new User(user.id, user.userName, user.Password, user.Phone, user.Email, user.UserType, user.WishList, user.Completed)));
    }
  }

}
