import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from '../Entities/coupon.model';
import { Product } from '../Entities/product.model';
import { User } from '../Entities/user.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { CouponService } from '../Services/coupon.service';
import { OrderService } from '../Services/order.service';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public thisPage: string = "Your Orders";
  public records: number[] = [4, 6, 8, 10, 12];
  public perPage: number = this.records[0];
  public page = 1;

  public pid!: number;
  public product!: Product;

  public itemsCount: number = 1;
  public couponCode: string = '';
  public finalPrice!: number;
  public couponPrice: number = 0;
  public validCoupon: boolean = false;
  public couponVerified: boolean = false;
  public curUser!: User;
  public inProgress = false;
  public orderInProgress = false;
  public cpnValidationInProgress = false;
  public proceedPurchase = true;
  private coupon!: Coupon;

  public prevOrders: any[] = [];

  public sortOrderReverse: boolean = true;
  public sortBy = "oid";

  constructor(private _authService: AuthenticationsService, private _couponService: CouponService, private _orderService: OrderService, private _activeRouter: ActivatedRoute, private router: Router, private _productsService: ProductsService) { }

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
    if (pathVars.itemsCount != undefined) {
      this.itemsCount = pathVars.itemsCount;
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
    this.inProgress = true;
    this._productsService.getProductById(this.pid).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.product = data.product;
          this.finalPrice = this.product.price * this.itemsCount;
        } else {
          console.log(data);
        }
        this.evaluateFinalPrice();
        this.inProgress = false;
      }, (err: HttpErrorResponse) => {
        this.inProgress = false;
      }
    )
  }

  loadPrevOrders() {
    this.inProgress = true;
    this._orderService.getOrders().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.prevOrders = data.orders;
        }
        this.inProgress = false;
      }, (err: HttpErrorResponse) => {
        this.inProgress = false;
        console.log(err);
      }
    )
  }

  updateSort(key: string) {
    this.sortBy = key;
    this.sortOrderReverse = !this.sortOrderReverse;
  }

  purchaseProduct() {
    let cpnid = 0;
    this.orderInProgress = true;
    if (!this.validCoupon) {
      this.couponCode = "none";
    } else {
      cpnid = this.coupon.id;
    }
    var data = {cpnId: cpnid, coupon: this.couponCode, items: this.itemsCount, pid: this.pid, uid: this.curUser.uid, price: this.finalPrice, token: this._authService.getUserToken().token}
    if (this.proceedPurchase) {
      this._orderService.placeOrder(data).subscribe(
        (data: any) => {
          this.orderInProgress = false;
          if (data.status == "success") {
            this.loadPrevOrders();
            this.fetchProduct();
            this.couponCode = '';
            this.validCoupon = false;
            alert("Order Placed Successfully!");
          } else if (data.status == "error") {
            alert(data.msg)
          }
        }, (err: any) => {
          console.log(err);
          this.orderInProgress = false;
        }
      )
    } else {
      alert("Invalid Submission")
    }
    return 0;
  }

  validateCoupon(cpnCode: string) {
    this.cpnValidationInProgress = true;
    this._couponService.valideCoupon(cpnCode).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.validCoupon = true;
          this.coupon = data.coupon
          this.couponPrice = data.coupon.offprice;
          this.evaluateFinalPrice();
        } else {
          this.validCoupon = false;
          this.couponPrice = 0;
          this.evaluateFinalPrice();
        }
        this.couponVerified = true;
        this.cpnValidationInProgress = false;
        this.validatePurchase();
      }, (err: any) => { this.cpnValidationInProgress = false }
    )
  }

  validatePurchase() {
    if (this.couponCode != '') {
      if (this.validCoupon) {
        if (this.couponCode != this.coupon.code) {
          this.couponVerified = false;
          this.couponPrice = 0;
          this.proceedPurchase = false;
          this.validCoupon = false;
        } else {
          this.proceedPurchase = true;
        }
      } else {
        this.couponPrice = 0;
        this.proceedPurchase = false;
      }
    } else if (this.couponCode == '') {
      if (this.couponVerified) {
        this.validCoupon = false;
        this.couponVerified = false;
        this.couponPrice = 0;
        this.proceedPurchase = true;
      } else {
        this.couponPrice = 0;
        this.proceedPurchase = true;
      }
    }
    this.evaluateFinalPrice();
  }

  evaluateFinalPrice() {
    this.finalPrice = (this.product.price * this.itemsCount) - this.couponPrice;
  }

  orderPage(pid: any) {
    if (AuthenticationsService.LoggedIn) {
      location.href = 'dashboard/orders/'+pid;
    } else {
      alert("Login To Order!");
    }
  }

}
