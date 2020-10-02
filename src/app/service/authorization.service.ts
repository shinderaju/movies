import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import {isNull} from 'util';
import {LocalstorageService} from './localstorage.service';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor( private localstorageService: LocalstorageService) {}
  isAuthorized(allowedRoles: string[]): boolean {
    if (allowedRoles == null || allowedRoles.length === 0) {
      return false;
    }

    // get token from local storage or state management
    const token = this.localstorageService.getItem('token');
    if (!token) {
      console.log('Invalid token');
      return false;
    }

    // decode token to read the payload details
    const decodeToken = jwt_decode(token);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(decodeToken['role']);
  }
  public isAuthenticated(): boolean {
    // get the token
    // const token = localStorage.getItem('token');
    const token = this.localstorageService.getItem('token');
    if (isNull(token)) {
      return false;
    } else if (token.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  public getToken(): string {
    const token = this.localstorageService.getItem('token');
    // const token = localStorage.getItem('token');
    if (isNull(token)) {
      return '';
    } else if (token.length > 0) {
      return token;
    } else {
      return '';
    }
  }
}
