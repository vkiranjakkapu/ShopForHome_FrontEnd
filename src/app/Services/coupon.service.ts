import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private url: string = environment.masterServiceURL+'/coupons';

  constructor(private http: HttpClient, private _authService: AuthenticationsService) { }

  valideCoupon(coupon: string): Observable<any> {
    let data: FormData = new FormData();
    data.append("token", this._authService.getUserToken().token);
    data.append("coupon", coupon);
    return this.http.put<any>(`${this.url}/`, data);
  }

  public getCoupons(): Observable<any> {
    return this.http.get<any>(`${this.url}/${this._authService.getUserToken().token}`);
  }

  public createCoupon(inp: any): Observable<any> {
    let data: FormData = new FormData();
    data.append("token", this._authService.getUserToken().token);
    data.append("type", inp.type);
    data.append("expireDays", inp.expireDays);
    data.append("offprice", inp.offprice);
    return this.http.post<any>(`${this.url}/`, data);
  }
}
