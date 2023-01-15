import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { FamilyRegister } from "../models/family-register.models";

@Injectable({ providedIn: 'root' })
export class FamilyResolver implements Resolve<FamilyRegister[]> {
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
  ): Observable<any>|Promise<FamilyRegister[]>|FamilyRegister[] {
    return this.http.get<(FamilyRegister[])>('http://localhost:8080/family-register', { headers: this.headers });
  }
}


