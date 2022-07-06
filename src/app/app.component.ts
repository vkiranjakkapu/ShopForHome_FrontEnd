import { Component } from '@angular/core';
import { User } from './Entities/user.model';
import { AuthenticationsService } from './Services/authentications.service';
import { BookService } from './Services/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopforhome';

  public login !: boolean;
  public currentUser: User | undefined;

  constructor(private _authService: AuthenticationsService, private _bookService: BookService) { }

  ngOnInit(): void {
    this.checkPrevLogin();
  }

  checkPrevLogin() {
    let localUser = localStorage.getItem('curUserToken');
    if (localUser != null) {
      let localUserObj = JSON.parse(atob(localUser));
      this._authService.localAuthnticate({ token: localUserObj }).then((data: any) => {
        this.currentUser = data.user;
        this.login = true;
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.login = this._authService.isLoggedIn();
      this.currentUser = this._authService.getCurrentUser();
    }
  }

  updateLoginState() {
    this.currentUser = this._authService.getCurrentUser();
    this.login = this._authService.isLoggedIn();
  }
}
