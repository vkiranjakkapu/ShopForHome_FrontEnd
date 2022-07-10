import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from '../Entities/coupon.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { CouponService } from '../Services/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  public thisPage: string = "Coupons";
  public records: number[] = [6, 9, 18, 27, 36, 45];
  public perPage: number = this.records[0];
  public page = 1;

  public inProgress: boolean = false;
  public coupons: Coupon[] = [];
  
  constructor(private _authService: AuthenticationsService, private _couponsServcice: CouponService, private router: Router) { }

  ngOnInit(): void {
    if (this._authService.getUserToken() == null) {
      location.href = '.';
    }
    this._authService.localAuthnticate(this._authService.getUserToken()).then(
      (data: any) => {
        if (data.status == "error") {
          this.router.navigate(['/dashboard']);
        }
      }
    )
    this.fetchCoupons();
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  fetchCoupons() {
    this._couponsServcice.getCoupons().subscribe((data: any) => {
      console.log(data.status);
      this.coupons = data.coupons;
      console.log(data.coupons);
      console.log(this.coupons);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  dateExpired(date: Date) {
    const today = new Date();
    let expire = new Date(date);
    return (today > date) ? true : false;
  }

}
