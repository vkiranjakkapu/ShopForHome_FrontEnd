import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { CartService } from '../Services/cart.service';
import { ProductsService } from '../Services/products.service';
import { WishlistService } from '../Services/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public thisPage: string = "Your Cart";
  public records: number[] = [8, 12, 16, 20, 24];
  public perPage: number = this.records[0];
  public page = 1;

  public isLoggedIn: boolean = false;
  public inProgress = false;
  public wishlist: Product[] = [];
  public cart: any[] = [];
  public search: string = "";
  public products: Product[] = [];

  constructor(private _authService: AuthenticationsService, private _cartService: CartService, private _wishlistService: WishlistService, private router: Router, private _activeRouter: ActivatedRoute) {
    this.fetchProducts();
    _activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    this.fetchProducts();
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    this._authService.localAuthnticate(this._authService.getUserToken()).then(
      (data: any) => {
        if (data.status == "error") { //  || data.user.acctype != "user"
          this.router.navigate(['/dashboard']);
        }
        this.wishlist = data.user.wishlist;
      }
    )
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  fetchProducts() {
    this._cartService.getProducts().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.cart = data.cart;
          this.cart.map((prd: Product) => {
            this.products.push(prd);
          })
          // this.products.push(cart.)
        }
      }, (err: HttpErrorResponse) => {
        
      }
    );
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
    this._cartService.getProducts().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.cart = data.cart;
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
        this.wishlist = data.user.wishlist;
        this.cart = data.user.cart;
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
    this.inProgress = true;
    this._wishlistService.modifyWishlist(id, method).subscribe(
      (data) => {
        if (data.status == "success") {
          alert(data.msg);
          this.refreshUser();
          // this.loadProducts();
          this.inProgress = false;
          setTimeout(() => {
            location.href = "./dashboard/cart";
          }, 500);
        } else {
          console.log(data);
        }
      }, (err: HttpErrorResponse) => {

      }
    );
  }

  modifyCart(id: any, method: string) {
    let max!: number, count!: number;
    if (method == 'update') {
      let countInp: any = document.getElementById(`itemsCount_${id}`);
      count = parseInt(countInp.value);
      max = parseInt(countInp.attributes.max.value);
      if (count < 0) {
        alert(count + " items cannot be added!");
        return 0;
      } else if (count > max) {
        alert("Only " + max + " items Available!");
        return 0;
      }
    }
    this.inProgress = true;
    this._cartService.modifyCart(id, count, method).subscribe(
      (data) => {
        if (data.status == "success") {
          alert(data.msg);
          this.refreshUser();
          // this.loadProducts();
          this.inProgress = false;
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
    if (e.target.attributes.skiproute == undefined) {
      if (this.isLoggedIn) {
        this.router.navigate(['dashboard', 'products', bid]);
      } else {
        this.router.navigate(['products', bid]);
      }
    }
  }

  orderPage(pid: any, count: number) {
    if (AuthenticationsService.LoggedIn) {
      this.router.navigate(['dashboard', 'orders', pid, count])
    } else {
      alert("Login To Order!");
    }
  }
  
  truncate(input: string, length: number) {
    return input.length > length ? `${input.substring(0, length)}...` : input;
  }

}
