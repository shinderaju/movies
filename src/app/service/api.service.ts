import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  loginLogoutEvent = new BehaviorSubject(false);
  showLoader = new BehaviorSubject(false);

  constructor(private http: HttpClient, private localstorageService: LocalstorageService) { }

  // Create
  createEmployee(data): Observable<any> {
    const url = `${this.baseUri}/employees/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getEmployee(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  login(data) {
    const url =  `${this.baseUri}/auth/login`;
    return this.http.post(url, data)
      .pipe(map(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.setToken('token', response['accessToken']);
        this.setToken('refreshToken', response['refreshToken']);
        this.loginLogoutEvent.next(true);
        // return user;
      }));
  }
  private setToken(key: string, token: string): void {
    this.localstorageService.setItem(key, token);
  }
  logout() {
    const url =  `${this.baseUri}/auth/logout`;
    return this.http.get(url)
      .pipe(map(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.localstorageService.removeItem('token');
        this.localstorageService.removeItem('refreshToken');
        this.localstorageService.clear();
        this.loginLogoutEvent.next(false);
        return response;
        // return user;
      }));
  }

}
