import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})


export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthorizationService,
    public router: Router,
    private localStorageService: LocalstorageService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: 'bearer ' + this.auth.getToken()
      }
    });
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              // localStorage.removeItem('token');
              // localStorage.removeItem('wishList');
              // localStorage.removeItem('vw-compare-data');

              this.localStorageService.clear();
              this.router.navigate(['/']);
            }
          }
        }
      )
    );
  }
}

