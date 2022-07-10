import { Component } from '@angular/core';
import { Product } from './Entities/product.model';
import { User } from './Entities/user.model';
import { AuthenticationsService } from './Services/authentications.service';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopforhome';

  public login !: boolean;
  public currentUser: User | undefined;
  public cart: Product[] = [];
  public wishlist: Product[] = [];

  constructor(private _authService: AuthenticationsService, private _cartService: CartService) { }

  ngOnInit(): void {
    this.checkPrevLogin();
  }

  checkPrevLogin() {
    let localUser = this._authService.getUserToken();
    if (localUser != null) {
      this._authService.localAuthnticate({ token: localUser.token }).then((data: any) => {
        this.currentUser = data.user;
        this.cart = data.cart;
        this.wishlist = data.wishlist;
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
