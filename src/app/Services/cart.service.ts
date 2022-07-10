import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = environment.masterServiceURL+"/cart";
  public cartIds: number[] = [];
  public wishlistIds: number[] = [];

  constructor(private _authService: AuthenticationsService, private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.url}/${this._authService.getUserToken().token}`);
  }

  getUserCart() {
    this._authService.localAuthnticate(this._authService.getUserToken).then(
      (data: any) => {
        if (data.status == "success") {
          this.cartIds = data.cart.pids;
          this.wishlistIds = data.wishlist.pids;
          alert(this.wishlistIds)
        }
      }
    )
  }

  modifyCart(id: any, count: number, action: any):Observable<any> {
    if (action == "add") {
      let data = {token: this._authService.getUserToken().token, itemsCount: count, pid: id};
      return this.http.post<any>(`${this.url}/`, data);
    }
    if (action == "update") {
      let data = {token: this._authService.getUserToken().token, itemsCount: count, pid: id};
      return this.http.put<any>(`${this.url}/`, data);
    }
    return this.http.delete<any>(`${this.url}/${id}/${this._authService.getUserToken().token}`);
  }
}
