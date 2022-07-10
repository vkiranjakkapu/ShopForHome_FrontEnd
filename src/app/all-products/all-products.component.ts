import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { User } from '../Entities/user.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { CartService } from '../Services/cart.service';
import { ProductsService } from '../Services/products.service';
import { WishlistService } from '../Services/wishlist.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  public thisPage: string = "Store Books";
  public records: number[] = [6, 9, 18, 27, 36, 45];
  public perPage: number = this.records[0];
  public page = 1;

  public isLoggedIn: boolean = false;
  public inProgress = false;
  public productsList: Product[] = [];
  public categoryList: string[] = [];
  public wishlist: number[] = [];
  public cart: number[] = [];
  public search: string = "";
  public itemsCount: number = 1;

  public sortType: string = "";
  public sortBy: string = "price";
  public sortCategory: string = "";
  public sortReverse: boolean = true;
  public user!: User;

  constructor(private _authService: AuthenticationsService, private _cartService: CartService, private _wishlistService: WishlistService, private _productsService: ProductsService, private router: Router, private _activeRouter: ActivatedRoute) {
    this.loadProducts();
    _activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    this.refreshUser();
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    this.loadProducts();
  }

  sortProducts(type: string) {
    this.sortType = type;
    this.sortReverse = !this.sortReverse;
  }

  sortByCategory(e: any) {
    let type = e.target.value;
    if (type != this.sortCategory) {
      this.sortCategory = type;
      this.loadProducts();
    }
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  getPathVariables(pathVars: any) {
    if (pathVars.pageId != undefined) {
      this.page = pathVars.pageId;
    }
  }

  searchProducts(): any {
    this.inProgress = true;
    if (this.search == "") {
      this.loadProducts();
      return 0;
    }
    this._productsService.searchProducts(this.search).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.productsList = data.products;
          if (this.sortCategory != '') {
            let sorted: Product[] = [];
            this.productsList.map((prd: Product) => {
              if (prd.category == this.sortCategory) {
                sorted.push(prd);
              }
            });
            this.productsList = sorted;
          }
        }
        this.inProgress = false;
      },
      (err: any) => {
        this.inProgress = false;
      }
    )
  }

  loadProducts() {
    this.inProgress = true;
    this._productsService.getProducts().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.productsList = data.products;
          if (this.sortCategory != '') {
            let sorted: Product[] = [];
            this.productsList.map((prd: Product) => {
              if (prd.category == this.sortCategory) {
                sorted.push(prd);
              }
            });
            this.productsList = sorted;
          }
          this.loadCatogaries();
        }
        this.inProgress = false;
      },
      (err: any) => {
        this.inProgress = false;
      }
    )
  }

  loadCatogaries() {
    this.productsList.map((prd: Product) => {
      this.categoryList.push(prd.category);
    });
    this.categoryList = [...new Set(this.categoryList)];
  }

  refreshUser() {
    this.inProgress = true;
    this._authService.localAuthnticate(this._authService.getUserToken()).then((data: any) => {
      if (data.status == "success") {
        if (!this.router.url.includes('dashboard')) {
          this.router.navigate(['/dashboard']);
        }
        this.user = data.user;
        this.wishlist = data.user.wishlist;
        this.cart = data.user.cart;
        this.isLoggedIn = this._authService.isLoggedIn();
      }
      this.inProgress = false;
    })
  }

  inWishlist(id: any): boolean {
    return (this.wishlist.indexOf(id) != -1);
  }

  inCart(id: any): boolean {
    return (this.cart.indexOf(id) != -1);
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
          location.href = "./dashboard/wishlist";
        } else {
          console.log(data);
        }
      }, (err: HttpErrorResponse) => {

      }
    );
  }

  modifyCart(id: any) {

    if (this._authService.getUserToken() == null) {
      alert("Login To Add this Item to cart!");
      return 0;
    }
    
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
          this.loadProducts();
          location.href = "./dashboard/cart";
        } else {
          console.log(data);
        }
      }, (err: HttpErrorResponse) => {

      }
    );
    return 0;
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

  orderPage(pid: any) {
    if (AuthenticationsService.LoggedIn) {
      this.router.navigate(['dashboard', 'orders', pid])
    } else {
      alert("Login To Order!");
    }
  }

  truncate(input: string, length: number) {
    return input.length > length ? `${input.substring(0, length)}...` : input;
  }

}
