import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerHttpService } from '../Services/server-http.service';
import { Route, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedProvince : String;
  selectedDistrict : String;
  selectedWard : String;
    
  addressValues : any[] = [];
  provinceValues : String[] = [];
  districtValues : String[] = [];
  wardValues : String[] = [];

  tempDistrictValues : any[] =[];
  
  isShowing: boolean;

  constructor(
    private serverHttp: ServerHttpService,
    public routes : Router,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      console.log(data);
      this.addressValues = data;
      data.forEach((element : any) => {
        this.provinceValues.push(element.name);
      });
    })
  }

  provinceChange(event : any) {
    this.districtValues = [];
    this.wardValues = [];
    this.tempDistrictValues = this.addressValues
      .filter(a => a.name === event.value);
    this.tempDistrictValues[0].districts.forEach((element : any) => {
      this.districtValues.push(element.name);
    })  
  }

  districtChange(event : any) {
    this.wardValues = [];
    const temp = this.tempDistrictValues[0].districts;
    const tempWardValues = temp
      .filter((a: any) => a.name === event.value);
    tempWardValues[0].wards.forEach((element : any) => {
      this.wardValues.push(element.name);
    })  
  }

  wardChange() {
    console.log(this.selectedProvince);
    console.log(this.selectedDistrict);
    console.log(this.selectedWard);
  }
  
  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }
  logout() {
    this.routes.navigate(['login']);
  }
  about() {
    this.routes.navigate(['about']);
  }

}
