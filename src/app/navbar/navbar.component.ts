import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Entities/product.model';
import { User } from '../Entities/user.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  displayAuth !: string;
  showProfile !: string;

  @Input('parentdata') public login: any;
  @Input('curUser') public user: User | undefined;
  @Input('userCart') public cart: Product[] | undefined;
  @Input('userWishlist') public wishlist: Product[] | undefined;

  constructor(private _authService: AuthenticationsService) { }

  ngOnInit(): void {
  }

  Logout() {
    this._authService.logout();
    location.href = './';
  }
}