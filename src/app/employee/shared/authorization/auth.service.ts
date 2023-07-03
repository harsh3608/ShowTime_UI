import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AES } from 'crypto-js';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  secretKey: string = 'showtime-2023';
  jwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
  ) { }

  setToken(token: string) {
    const eToken = AES.encrypt(token, this.secretKey).toString();
    localStorage.setItem("access_token", eToken);
  }

  getToken() {
    const val = localStorage.getItem('access_token') || ''
    const dToken = AES.decrypt(val, this.secretKey).toString(CryptoJS.enc.Utf8);
    return dToken;
  }

  getUserId() {
    const token = this.getToken();
    const decodedToken = this.jwtHelperService.decodeToken(token);
    return decodedToken.sub;
  }

  getUserRole() {
    const token = this.getToken();
    const decodedToken = this.jwtHelperService.decodeToken(token);
    return decodedToken.UserType;
  }

  getUserMail() {
    const token = this.getToken();
    const decodedToken = this.jwtHelperService.decodeToken(token);
    return decodedToken.Email;
  }

  getPersonName() {
    const token = this.getToken();
    const decodedToken = this.jwtHelperService.decodeToken(token);
    return decodedToken.PersonName;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("access_token") ? true : false
  }

  removeToken() {
    localStorage.removeItem("access_token");
    localStorage.clear();
  }

  isRequestAuthorized() {
    const token = this.getToken();
    // console.log(this.jwtHelperService.isTokenExpired(token));
    // return this.jwtHelperService.isTokenExpired(token);
    const expirytime = this.jwtHelperService.getTokenExpirationDate(token) || '';
    if(expirytime > new Date){
      return true;
    }
    return false
  }
}
