import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../Entities/order.model';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.masterServiceURL;

  constructor(private _authService: AuthenticationsService, private http: HttpClient) { }

  placeOrder(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/orders/`, data);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/orders/${this._authService.getUserToken().token}`);
  }

  valideCoupon(coupon: string): Observable<any> {
    return this.http.get<any>(`${this.url}/coupons/${coupon}/${this._authService.getUserToken().token}`);
  }

  removeFromOrder(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${this._authService.getUserToken().token}/${id}`);
  }
}
