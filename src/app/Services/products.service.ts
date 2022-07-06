import { HttpClient, HttpClientModule, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../Entities/product.model';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = environment.masterServiceURL+"/products";

  constructor(private _authService: AuthenticationsService, private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/`);
  }

  getProductById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${id}`);
  }

  createProduct(data: any): Observable<Product> {
    data = {product: data, token: this._authService.getUserToken()}
    return this.http.post<Product>(`${this.url}/`, data);
  }

  getBrandNames(): Observable<any> {
    return this.http.get<any>(`${this.url}/`);
  }

  bulkUploadProducts(file: any) {
    const formData: FormData = new FormData();
    formData.append('bulkfile', file);
    formData.append('token', this._authService.getUserToken().token);
    return this.http.post<Product>(`${this.url}/bulk`, formData);
  }

  updateProduct(data: any): Observable<Product> {
    data = { product: data, token: this._authService.getUserToken() }
    return this.http.put<Product>(`${this.url}/`, data);
  }

  deleteProduct(id: any): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}/`);
  }

  searchProducts(key: string): Observable<any> {
    return this.http.get<any>(`${this.url}/search/${key}`);
  }
  
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('bulkfile', file);
    formData.append('token', this._authService.getUserToken().token);
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.url}/files`);
  }

  // inWishlist(id: any): boolean {
  //   return (this._authService.getCurrentUser()?.getWishList()?.indexOf(id) != -1) ? true : false;
  // }

  // modifyWishlist(id: any): boolean {
  //   let wishlist = this._authService.getCurrentUser()?.getWishList();
  //   let status: boolean = true;
  //   if (this.inWishlist(id)) {
  //     wishlist?.splice(wishlist?.indexOf(id, 1));
  //     window.alert('Product removed from Wishlist');
  //   } else {
  //     if (this.getProductById(id) != undefined) {
  //       wishlist?.push(id);
  //       window.alert('Product added to Wishlist');
  //     } else {
  //       window.alert("Product Not Found!");
  //       status = false;
  //     }
  //   }
  //   this._authService.getCurrentUser()?.setWishList(wishlist);
  //   return status;
  // }

  // inCart(id: any): boolean {
  //   return (this._authService.getCurrentUser()?.getCompleted()?.indexOf(id) != -1) ? true : false;
  // }

  // modifyCart(id: any): boolean {
  //   let completed = this._authService.getCurrentUser()?.getCompleted();
  //   let status: boolean = true;
  //   if (this.inCart(id)) {
  //     completed?.splice(completed?.indexOf(id, 1));
  //     window.alert('Product removed from Completed');
  //   } else {
  //     if (this.getProductById(id) != undefined) {
  //       completed?.push(id);
  //       window.alert('Product added to Completed');
  //     } else {
  //       window.alert("Product Not Found!");
  //       status = false;
  //     }
  //   }
  //   this._authService.getCurrentUser()?.setCompleted(completed);
  //   return status;
  // }
}
