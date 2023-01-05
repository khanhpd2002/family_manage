import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {
  }

  token = window.sessionStorage.getItem('token');
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: this.token ? `Bearer ${this.token.substring(1, this.token.length - 1)}` : ''
      },
    });
    return next.handle(request);
  }
}
