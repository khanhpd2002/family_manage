import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
// import { family-register } from "../models/family-register.models";
import { People } from "../models/people.model";

@Injectable({ providedIn: 'root' })
export class PeopleResolver implements Resolve<People[]> {
  constructor(public http: HttpClient) {}
  token = window.sessionStorage.getItem('token');
  // console.log(token);
  headers:HttpHeaders  = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token ? `Bearer ${this.token.substring(1, this.token.length - 1)}` : ''
  })
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<People[]>|People[] {
    return this.http.get<(People[])>('http://localhost:8080/people', { headers: this.headers });
  }
}


