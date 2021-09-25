import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserInfo } from '../models/user-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //  user mig_24@hotmail.com - pass: Aa123456!
  private apiUrl = this.baseUrl + "api/account";

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl:string ) { }

  create(userInfo:IUserInfo):Observable<any> {
    return this.http.post(this.apiUrl + "/Create", userInfo);
  }

  login(userInfo:IUserInfo):Observable<any> {
    return this.http.post(this.apiUrl + "/Login", userInfo);
  }

  obtenerToken(): string {
    return localStorage.getItem("token");
  }

  obtenerExpiracionToken(): string {
    return localStorage.getItem("tokenExpiration");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }

  estaLogueado(): boolean {
    var exp = this.obtenerExpiracionToken();

    if (!exp) {
      // el token no existe
      return false;
    }

    var now = new Date().getTime();
    var dateExp = new Date(exp);

    if (now >= dateExp.getTime()) {
      // ya expiró el token
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return false;
    } else {
      return true;
    }
  }
}
