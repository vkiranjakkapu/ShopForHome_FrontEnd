import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  public thisPage: string = "Store Books";
  public records: number[] = [8, 12, 16, 20, 24];
  public perPage: number = this.records[0];
  public page = 1;

  public isLoggedIn: boolean = false;
  public inProgress = false;
  public productsList: Product[] = [];
  public search: string = "";

  constructor(private _authService: AuthenticationsService, private _productsService: ProductsService, private router: Router, private _activeRouter: ActivatedRoute) {
    this.fetchProducts();
    _activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    this.fetchProducts();
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    if (this._authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  fetchProducts() {
    this._productsService.getProducts().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.productsList = data.products;
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
