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
    data = {product: data, token: this._authService.getUserToken().token}
    return this.http.post<Product>(`${this.url}/`, data);
  }

  getBrandNames(): Observable<any> {
    return this.http.get<any>(`${this.url}/ops`);
  }

  bulkUploadProducts(file: any) {
    const formData: FormData = new FormData();
    formData.append('bulkfile', file);
    formData.append('token', this._authService.getUserToken().token);
    return this.http.post<Product>(`${this.url}/ops`, formData);
  }

  updateProduct(data: any): Observable<Product> {
    data = { product: data, token: this._authService.getUserToken().token }
    return this.http.put<Product>(`${this.url}/`, data);
  }

  deleteProduct(id: any): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}/`);
  }

  searchProducts(key: string): Observable<any> {
    return this.http.get<any>(`${this.url}/ops/${key}`);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.url}/files`);
  }
}
