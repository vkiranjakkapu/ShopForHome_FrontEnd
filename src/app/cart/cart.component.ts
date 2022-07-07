import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { CartService } from '../Services/cart.service';
import { ProductsService } from '../Services/products.service';

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
  public cart: Product[] = [];
  public search: string = "";

  constructor(private _authService: AuthenticationsService, private _cartService: CartService, private _productsService: ProductsService, private router: Router, private _activeRouter: ActivatedRoute) {
    this.fetchProducts();
    _activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    this.fetchProducts();
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    this._authService.localAuthnticate(this._authService.getUserToken()).then(
      (data: any) => {
        this.cart = data.cart.products
      }
    )
    if (!this._authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  fetchProducts() {
    this._cartService.getProducts().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.cart = data.products;
        }
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
          this.cart = data.products;
        }
        this.inProgress = false;
      },
      (err: any) => {
        this.inProgress = false;
      }
    )
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

}
