import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Entities/product.model';
import { User } from '../Entities/user.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { OrderService } from '../Services/order.service';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public thisPage: string = "Store Books";
  public records: number[] = [8, 12, 16, 20, 24];
  public perPage: number = this.records[0];
  public page = 1;

  public pid!: number;
  public product!: Product;
  public itemsCount: number = 1;
  public coupon!: string;
  public finalPrice!: number;
  public couponPrice: number = 0;
  public validCoupon: boolean = false;
  public couponVerified: boolean = false;
  public curUser!: User;
  public inProgress = false;

  public prevOrders: any[] = [];

  constructor(private _authService: AuthenticationsService, private _orderService: OrderService, private _activeRouter: ActivatedRoute, private router: Router, private _productsService: ProductsService) { }

  ngOnInit(): void {
    this._activeRouter.params.subscribe((pages: any) => { this.getPathVariables(pages) });
    this.fetchProduct();
    this.refreshLogin();
    this.loadPrevOrders();
  }

  getPathVariables(pathVars: any) {
    if (pathVars.pid != undefined) {
      this.pid = pathVars.pid;
    }
  }

  refreshLogin() {
    this._authService.localAuthnticate(this._authService.getUserToken()).then(
      (data: any) => {
        if (data.status != "success") {
          alert("Please Login to Order!");
          this.router.navigate(['/']);
        } else if (!this.router.url.includes('dashboard')) {
          this.router.navigate(['dashboard']);
        }
        if (data.status == "success") {
          this.curUser = data.user;
        }
      }
    )
  }

  fetchProduct() {
    this._productsService.getProductById(this.pid).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.product = data.product;
          this.finalPrice = this.product.price;
        } else {
          console.log(data);
        }
      }, (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }

  loadPrevOrders() {
    this._orderService.getOrders().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.prevOrders = data.orders;
        }
      }, (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }

  purchaseProduct() {
    this.inProgress = true;
    var data = {coupon: this.coupon, items: this.itemsCount, pid: this.pid, uid: this.curUser.uid, price: this.finalPrice, token: this._authService.getUserToken().token}
    if (((this.itemsCount > 0) && (this.finalPrice > 0) && (this.itemsCount <= this.product.stock) && ((this.coupon == '' && this.validCoupon) || this.coupon == undefined))) {
      this._orderService.placeOrder(data).subscribe(
        (data: any) => {
          this.inProgress = false;
          if (data.status == "success") {
            this.loadPrevOrders();
            this.fetchProduct();
            alert("Order Placed Success fully!");
          }
        }, (err: any) => {
          console.log(err);
          this.inProgress = false;
        }
      )
    } else {
      // alert("Not In")
    }
    return 0;
  }

  validateCoupon(coupon: string) {
    this._orderService.valideCoupon(coupon).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.validCoupon = true;
          this.couponPrice = data.offer;
          this.evaluateFinalPrice();
        } else {
          this.validCoupon = false;
          this.couponPrice = 0;
          this.evaluateFinalPrice();
        }
        this.couponVerified = true;
      }, (err: any) => {
        console.log(err);
      }
    )
  }

  evaluateFinalPrice() {
    this.finalPrice = (this.product.price * this.itemsCount) - this.couponPrice;
  }

}
