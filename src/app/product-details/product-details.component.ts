import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private pid!: number;
  public product!: Product;

  constructor(private _productsService: ProductsService, private _authService: AuthenticationsService, private router: Router, private _activeRouter: ActivatedRoute) {
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    this.fetchProduct()
  }

  getPathVariables(pathVars: any) {
    if (pathVars.pid != undefined) {
      this.pid = pathVars.pid;
    }
  }

  fetchProduct() {
    this._productsService.getProductById(this.pid).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.product = data.product;
        } else {
          console.log(data);
        }
      }, (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }

  openCheckOupPage(pid: number | undefined) {
    this._authService.localAuthnticate(this._authService.getUserToken()).then(
      (data: any) => {
        if (data.status == "success") {
          this.router.navigate(['dashboard', 'orders', pid]);
        } else if (!this.router.url.includes('dashboard')) {
          this.router.navigate(['dashboard']);
        }
      }
    )
  }
}
