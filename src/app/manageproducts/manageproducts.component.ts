import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.css']
})
export class ManageproductsComponent implements OnInit {

  public thisPage: string = "Store Books";
  public records: number[] = [6, 9, 18, 27, 36, 45];
  public perPage: number = this.records[0];
  public page = 1;

  public isLoggedIn: boolean = false;
  public inProgress = false;
  public bulkInProgress = false;
  public bulkFileName = "";
  public btnDisable: boolean = true;

  alerts: { status: string, msg: string, for: string } = { status: "none", msg: "", for: "" };
  public distinctBrands: Product[] = [];
  public productsList: Product[] = [];
  public categoryList: string[] = [];

  public modalTitle!: string;
  public product!: Product;
  public search: string = "";
  public type: String = "create";

  public selectedFiles!: FileList | any;
  public currentFile!: File | any;
  public progress = 0;
  public message = '';
  public fileInfos!: Observable<any>;

  public sortType: string = "";
  public sortBy: string = "price";
  public sortCategory: string = "";
  public sortReverse: boolean = true;

  constructor(private _authService: AuthenticationsService, private _productsService: ProductsService, private router: Router, private _activeRouter: ActivatedRoute) {
    this.loadProducts();
    _activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
  }

  ngOnInit(): void {
    this.loadProducts();
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    if (this._authService.isLoggedIn()) {
      if (this._authService.getCurrentUser()?.acctype !== "admin") {
        this.router.navigate(['/dashboard']);
      }
    }
    this.isLoggedIn = this._authService.isLoggedIn();
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

  bulkUpdate(file: any) {
    this.bulkInProgress = true;
    this._productsService.bulkUploadProducts(file.target.files.item(0)).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.getProducts();
          this.loadProducts();
        }
        this.alerts.for = "bulkUpload";
        this.alerts.status = data.status;
        this.alerts.msg = data.msg;
        this.bulkInProgress = false;
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

  setProductData(type: any, id: number, e: any) {
    this.inProgress = true;
    this._productsService.getProductById(id).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.product = data.product;
        }
      },
      (err: HttpErrorResponse) => { }
    )
    this.inProgress = false;
  }

  createProduct(data: any) {
    this.inProgress = true;
    this.alerts.for = "create";
    this.product = new Product(this.productsList.length + 1, data.prdname, data.prdimage, data.prdprice, data.prdstock, data.prdcategory, data.prdbrandName);
    this._productsService.createProduct(this.product).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.product = data.product;
          this.getProducts();
          setTimeout(() => {
            location.href = "dashboard/manageproducts";;
          }, 1000);
        }
        this.alerts.msg = data.msg;
        this.alerts.status = data.status;
      },
      (err: HttpErrorResponse) => {
        this.alerts.msg = err.message;
        this.alerts.status = err.status + "";
        console.log(err);
      }
    )
    this.inProgress = false;
  }

  getProducts() {
    this.inProgress = true;
    this._productsService.getProducts().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.productsList = data.products;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
    this.inProgress = false;
  }

  updateProduct(data: any) {
    this.inProgress = true;
    this.alerts.for = "update";
    this.product = new Product(this.product?.pid, data?.name, data?.image, data?.price, data?.stock, data?.category, data?.brandName);
    this._productsService.updateProduct(this.product).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.getProducts();
          alert(data.msg);
          setTimeout(() => {
            location.href = "dashboard/manageproducts";
          }, 1000);
        }
        this.inProgress = false;
      },
      (err: any) => {
        this.inProgress = false;
      }
    )
    this.inProgress = false;
  }

  deleteProduct(id: number) {
    this.inProgress = true;
    this._productsService.deleteProduct(id).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.productsList = data.products;
          this.loadProducts();
          alert(data.msg);
        }
        this.inProgress = false;
      },
      (err: any) => {
        this.inProgress = false;
      }
    )
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

  openProductDetails(e: any, bid: any) {
    if (e.target.attributes.skiproute == undefined) {
      if (this.isLoggedIn) {
        this.router.navigate(['dashboard', 'products', bid]);
      } else {
        this.router.navigate(['products', bid]);
      }
    }
  }

  truncate(input: string, length: number) {
    return input.length > length ? `${input.substring(0, length)}...` : input;
  }

}
