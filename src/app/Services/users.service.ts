import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Entities/user.model';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.masterServiceURL+"/users";

  constructor(private _authService: AuthenticationsService, private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  createUser(data: any): Observable<User> {
    data = {user: data, token: this._authService.getUserToken().token}
    return this.http.post<User>(`${this.url}/`, data);
  }

  updateUser(data: any): Observable<User> {
    data = { user: data, token: this._authService.getUserToken().token }
    return this.http.put<User>(`${this.url}/`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}/`);
  }

  searchUsers(key: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/search/${key}`);
  }
}
