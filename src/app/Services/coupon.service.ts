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

  public getCoupons(): Observable<any> {
    return this.http.get<any>(`${this.url}/${this._authService.getUserToken().token}`);
  }
}
