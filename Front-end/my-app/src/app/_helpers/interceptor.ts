import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';


@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {
  }
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  token = window.sessionStorage.getItem('token');
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var request1 = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: this.token ? `Bearer ${this.token.substring(1, this.token.length - 1)}` : ''
      },
    });
    return next.handle(request1).pipe(
      catchError((err) => {
        return next.handle(request);
      })
    );
  }
}
