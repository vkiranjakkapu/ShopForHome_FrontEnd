import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { BookService } from '../Services/books.service';
import { CartService } from '../Services/cart.service';
import { ProductsService } from '../Services/products.service';
import { WishlistService } from '../Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public thisPage: string = "Your Wishlist";
  public records: number[] = [8, 12, 16, 20, 24];
  public perPage: number = this.records[0];
  public page = 1;

  public isLoggedIn: boolean = false;
  public inProgress = false;
  public wishlist: Product[] = [];
  public cart: number[] = [];
  public search: string = "";

  constructor(private _authService: AuthenticationsService, private _wishlistService: WishlistService, private _cartService: CartService, private router: Router, private _activeRouter: ActivatedRoute) {
    this.loadProducts();
    _activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    this.loadProducts();
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    this._authService.localAuthnticate(this._authService.getUserToken()).then(
      (data: any) => {
        if (data.status == "error" || data.user.acctype != "user") {
          this.router.navigate(['/dashboard']);
        }
        this.wishlist = data.wishlist.products
      }
    )
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  getPathVariables(pathVars: any) {
    if (pathVars.pageId != undefined) {
      this.page = pathVars.pageId;
    }
  }

  loadProducts() {
    this.inProgress = true;
    this._wishlistService.getProducts().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.wishlist = data.products;
        }
        this.inProgress = false;
      },
      (err: any) => {
        this.inProgress = false;
      }
    )
  }

  refreshUser(){
    this._authService.localAuthnticate(this._authService.getUserToken()).then((data: any) => {
      if (data.status == "success") {
        if (!this.router.url.includes('dashboard')) {
          this.router.navigate(['/dashboard']);
        }
        this.wishlist = data.wishlist.pids;
        this.cart = data.cart.pids;
        this.isLoggedIn = this._authService.isLoggedIn();
      }
    })
  }

  inWishlist(id: any): boolean {
    return (this.wishlist.indexOf(id) != -1);
  }

  modifyWishlist(id: any) {
    let method = "remove";
    if (!this.inWishlist(id)) {
      method = "add";
    }
    this._wishlistService.modifyWishlist(id, method).subscribe(
      (data) => {
        if (data.status == "success") {
          alert(data.msg);
          this.refreshUser();
          this.loadProducts();
          setTimeout(() => {
            location.href = "./dashboard/wishlist";
          }, 500);
        } else {
          console.log(data);
        }
      }, (err: HttpErrorResponse) => {

      }
    );
  }

  modifyCart(id: any) {
    let method = "remove";
    let max, count;
    if (!this.inCart(id)) {
      method = "add";
      let countInp: any = document.getElementById(`itemsCount_${id}`);
      count = countInp.value;
      max = countInp.attributes.max;
      if (count < 0) {
        alert(count + " items cannot be added!");
        return 0;
      } else if (count > max) {
        alert("Only " + max + " items Available!");
        return 0;
      }
    }
    this._cartService.modifyCart(id, count, method).subscribe(
      (data) => {
        if (data.status == "success") {
          alert(data.msg);
          this.refreshUser();
          this.loadProducts();
          setTimeout(() => {
            location.href = "./dashboard/cart";
          }, 100);
        } else {
          console.log(data);
        }
      }, (err: HttpErrorResponse) => {

      }
    );
    return 0;
  }

  inCart(id: any): boolean {
    return (this.cart.indexOf(id) != -1);
  }
  
  openProductDetails(e: any, bid: any) {
    if (e.target.nodeName != 'BUTTON') {
      if (this.isLoggedIn) {
        this.router.navigate(['dashboard', 'products', bid]);
      } else {
        this.router.navigate(['products', bid]);
      }
    }
  }

  orderPage(pid: any) {
    if (AuthenticationsService.LoggedIn) {
      this.router.navigate(['dashboard', 'orders', pid])
    } else {
      alert("Login To Order!");
    }
  }
}
