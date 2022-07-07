import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../Entities/cart.model';
import { Order } from '../Entities/order.model';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.masterServiceURL+"/orders";

  constructor(private _authService: AuthenticationsService, private http: HttpClient) { }

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/${this._authService.getUserToken().token}`);
  }

  addToOrder(data: any): Observable<Order> {
    data = { Order: data, token: this._authService.getUserToken().token }
    return this.http.put<Order>(`${this.url}/`, data);
  }

  removeFromOrder(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${this._authService.getUserToken().token}/${id}`);
  }
}
