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
    return this.http.get<Product[]>(`${this.url}/`);
  }

  getUserCart() {
    this._authService.localAuthnticate(this._authService.getUserToken).then(
      (data: any) => {
        if (data.status == "success") {
          this.cartIds = data.cart.pids;
          this.wishlistIds = data.wishlist.pids;
        }
      }
    )
  }

  inCart(id: number): boolean {
    return (this.cartIds.indexOf(id) != -1)
  }

  inWishlist(id: number): boolean {
    return (this.wishlistIds.indexOf(id) != -1)
  }
}
