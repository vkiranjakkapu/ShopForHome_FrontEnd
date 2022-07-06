import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private pid!: number;
  public product!: Product;

  constructor(private _productsService: ProductsService, private router: Router, private _activeRouter: ActivatedRoute) {
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  getPathVariables(pathVars: any) {
    if (pathVars.pageId != undefined) {
      this.pid = pathVars.pageId;
    } else {
      this.router.navigate(['/products']);
    }
  }

  fetchProduct() {
    this._productsService.getProductById(this.pid).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.product = data.product;
        } else {
          
        }
      }, (err: HttpErrorResponse) => {
        this.router.navigate(['products']);
      }
    )
  }

}
