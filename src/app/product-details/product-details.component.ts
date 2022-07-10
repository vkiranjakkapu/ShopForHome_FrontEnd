import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { CartService } from '../Services/cart.service';
import { ProductsService } from '../Services/products.service';
import { WishlistService } from '../Services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private pid!: number;
  public product!: Product;
  public inProgress: boolean = false;
  private isLoggedIn: boolean = false;

  public wishlist: number[] = [];
  public cart: number[] = [];

  constructor(private _productsService: ProductsService, private _cartService: CartService, private _wishlistService: WishlistService, private _authService: AuthenticationsService, private router: Router, private _activeRouter: ActivatedRoute) {
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    this.fetchProduct();
  }

  ngOnInit(): void {
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    this.fetchProduct();
  }

  getPathVariables(pathVars: any) {
    if (pathVars.pid != undefined) {
      this.pid = pathVars.pid;
    }
  }

  fetchProduct() {
    this.inProgress = true;
    this._productsService.getProductById(this.pid).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.product = data.product;
        } else {
          console.log(data);
        }
        this.inProgress = false;
      }, (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }

  inWishlist(id: any): boolean {
    return (this.wishlist.indexOf(id) != -1);
  }

  refreshUser() {
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
          this.fetchProduct();
          location.href = "./dashboard/wishlist";
        } else {
          console.log(data);
        }
      }, (err: HttpErrorResponse) => {

      }
    );
  }

  modifyCart(id: any) {
    let method = "remove";
    let max!: number, count!: number;
    if (!this.inCart(id)) {
      method = "add";
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
    this._cartService.modifyCart(id, count, method).subscribe(
      (data) => {
        if (data.status == "success") {
          alert(data.msg);
          this.refreshUser();
          this.fetchProduct();
          location.href = "./dashboard/cart";
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

  openCheckOupPage() {
    if (this._authService.getUserToken() == null) {
      alert("You Must Login to Order a Product!");
    } else {
      this.router.navigate(['dashboard', 'orders', this.product.pid]);
    }
  }
}
