import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private url = environment.masterServiceURL+"/wishlist";
  public cartIds: number[] = [];
  public wishlistIds: number[] = [];

  constructor(private _authService: AuthenticationsService, private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${this._authService.getUserToken().token}`);
  }

  getUserWishlist() {
    this._authService.localAuthnticate(this._authService.getUserToken()).then(
      (data: any) => {
        if (data.status == "success") {
          this.cartIds = data.cart.pids;
          this.wishlistIds = data.wishlist.pids;
        }
      }
    )
  }

  modifyWishlist(id: any, action: string):Observable<any> {
    if (action == "add") {
      return this.http.post<any>(`${this.url}/`, {token: this._authService.getUserToken().token, pid: id});
    }
    return this.http.delete<any>(`${this.url}/${id}/${this._authService.getUserToken().token}`);
  }
}
