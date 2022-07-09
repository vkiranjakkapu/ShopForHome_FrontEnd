import { Inject, Injectable, OnInit } from '@angular/core';
import { Data } from '../Resources/data';
import { User } from '../Entities/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationsService extends Data {

  private url: string = environment.masterServiceURL + '/authentications/';

  private static _curUser: User | undefined = undefined;
  private static _LoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    super();
  }

  async authenticateUser(creds: any) {
    let resp = new Promise((resolve, reject) => {
      this.http.post<User>(`${this.url}`, creds).subscribe(
        (data: any) => {
          if (data.status == "success") {
            AuthenticationsService.curUser = data.user;
            AuthenticationsService.LoggedIn = true;
            resolve({ "status": "success", "msg": "Authentication Success! Redirecting...", "user": this.getCurrentUser() });
            this.saveUserCreds(data.token);
          } else {
            AuthenticationsService.LoggedIn = false;
            reject({ "status": "error", "msg": "Wrong Username/Password Combination" });
          }
        }
      )
    });
    return await resp;
  }

  getUserToken(): any {
    let localUser = localStorage.getItem('curUserToken');
    if (localUser != null) {
      let localUserObj = JSON.parse(atob(localUser));
      return {token: localUserObj};
    } else {
      return null;
    }
  }

  async localAuthnticate(data: any) {
    let formData: FormData = new FormData();
    formData.append("token", data.token);
    let resp = new Promise((resolve, reject) => {
      this.http.post<User>(`${environment.masterServiceURL}/authtoken/`, formData).subscribe(
        (data: any) => {
          if (data.status == "success") {
            AuthenticationsService.curUser = data.user;
            AuthenticationsService.LoggedIn = true;
            this.saveUserCreds(data.token);
            resolve(data);
          } else {
            AuthenticationsService.LoggedIn = false;
            reject({ "status": "error", "msg": "Wrong Username/Password Combination" });
          }
        }, (err: HttpErrorResponse) => {
          AuthenticationsService.LoggedIn = false;
          reject({ "status": "error", "msg": "Invalid Token" });
        }
      )
    });
    return await resp;
  }

  private saveUserCreds(token: any) {
    let bs64EncUser = btoa(JSON.stringify(token));
    localStorage.setItem('curUserToken', bs64EncUser);
  }

  async registerUser(data: any) {
    let resp = new Promise((resolve, reject) => {
      this.http.put<User>(`${this.url}`, data).subscribe(
        (data: any) => {
          if (data.status == "success") {
            let newUser = data.user;
            this.authenticateUser({ "id": newUser.id, "email": newUser.email, "password": newUser.password });
            AuthenticationsService.LoggedIn = true;
            resolve(data);
          } else {
            AuthenticationsService.LoggedIn = false;
            reject(data);
          }
        }, (err: HttpErrorResponse) => {
          AuthenticationsService.LoggedIn = false;
          reject(data);
        }
      );
    });
    return await resp;
  }

  logout() {
    AuthenticationsService.curUser = undefined;
    AuthenticationsService.LoggedIn = false;
    localStorage.removeItem('curUserToken');
  }

  getCurrentUser(): User | undefined {
    if (this.isLoggedIn()) {
      return AuthenticationsService.curUser;
    } else {
      return undefined;
    }
  }

  isLoggedIn(): boolean {
    if (AuthenticationsService.LoggedIn) {
      return true;
    } else {
      return false;
    }
  }
  public static get curUser(): User | undefined {
    return AuthenticationsService._curUser;
  }
  public static set curUser(value: User | undefined) {
    AuthenticationsService._curUser = value;
  }

  public static get LoggedIn(): boolean {
    return AuthenticationsService._LoggedIn;
  }
  public static set LoggedIn(value: boolean) {
    AuthenticationsService._LoggedIn = value;
  }
}
