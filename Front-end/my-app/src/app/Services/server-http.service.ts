import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})


export class ServerHttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
    }),
  }

  REST_API_SERVER_COVID = 'https://api.covid19api.com';
  REST_API_SERVER_PROFILE = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  public getAll() {
    const url = `${this.REST_API_SERVER_COVID}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getSummary() {
    const url = `${this.REST_API_SERVER_COVID}/summary`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  public getProfile(): Observable<any> {
    const url = `${this.REST_API_SERVER_PROFILE}/profile`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public postProfile(data: any): Observable<any> {
    const url = `${this.REST_API_SERVER_PROFILE}/profile`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getCommmets(): Observable<any> {
    const url = `${this.REST_API_SERVER_PROFILE}/comments`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
