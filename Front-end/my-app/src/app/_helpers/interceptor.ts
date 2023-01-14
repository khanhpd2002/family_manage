import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';


@Injectable()
export class Interceptor implements HttpInterceptor, OnInit {
  public token: any;
  constructor(
    private router: Router,
  ) {
    // this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    // this.token = localStorage.getItem('token');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');
    console.log(this.token);
    var request1 = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: this.token ? `Bearer ${this.token.substring(1, this.token.length - 1)}` : ''
      },
    });
    return next.handle(request1).pipe(
      catchError((err) => { // return next.handle(request);
        // if (err.status == 404)
        //   return next.handle(request);
        if(err.status == 401){
          this.router.navigateByUrl('/login');
          throw new Error();
        }
        return next.handle(request);
      })
    );
  }
}
