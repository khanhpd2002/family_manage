import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
// import { family-register } from "../models/family-register.models";
import { Charge } from "../models/charge.models";

@Injectable({ providedIn: 'root' })
export class ChargeResolver implements Resolve<Charge[]> {
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
  ): Observable<any>|Promise<Charge[]>|Charge[] {
    return this.http.get<(Charge[])>('http://localhost:8080/charge', { headers: this.headers });
  }
}


