import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from '../Entities/coupon.model';
import { User } from '../Entities/user.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { CouponService } from '../Services/coupon.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  public thisPage: string = "Coupons";
  public records: number[] = [10, 20, 30, 40];
  public perPage: number = this.records[0];
  public page = 1;

  public coupons: Coupon[] = [];
  public cpnUsers: any[] = [];

  public inProgress: boolean = false;
  public createInProgress: boolean = false;
  alerts: { status: string, msg: string, for: string } = { status: "none", msg: "", for: "" };

  public curUser!: User;

  constructor(private _authService: AuthenticationsService, private _usersService: UsersService, private _couponsServcice: CouponService, private router: Router) { }

  ngOnInit(): void {
    if (this._authService.getUserToken() == null) {
      location.href = '.';
    }
    this._authService.localAuthnticate(this._authService.getUserToken()).then(
      (data: any) => {
        if (data.status == "error") {
          this.router.navigate(['/dashboard']);
        } else {
          this.curUser = data.user;
        }
      }, (err: HttpErrorResponse) => { });
    this.fetchCoupons();
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  fetchCoupons() {
    this.inProgress = true;
    this._couponsServcice.getCoupons().subscribe((data: any) => {
      this.coupons = data.coupons;
      this.inProgress = false;
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.inProgress = false;
    });
  }

  createCoupon(data: any) {
    this.createInProgress = true;
    this._couponsServcice.createCoupon(data).subscribe((data: any) => {
      if (data.status == "success") {
        this.alerts.status = data.status;
        this.alerts.msg = data.msg;
        this.createInProgress = false;
        this.fetchCoupons();
      }
    }, (err: HttpErrorResponse) => { this.createInProgress = false })
  }

  convertDate(date: any): Date {
    var t: any, result!: Date;
    if (typeof date === 'string') {
      t = date.split("T");
      var dt = t[0];
      var tm = t[1].split(".")[0];
      result = new Date(dt + ' ' + tm);
    }
    return result;
  }

  dateExpired(date: any) {
    const today = new Date();
    var expire: any = this.convertDate(date.toString());
    return (today > expire) ? true : false;
  }
}
