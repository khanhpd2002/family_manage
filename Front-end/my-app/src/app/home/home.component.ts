import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addressValues : any[] = [];
  provinceValues : String[] = [];
  districtValues : String[] = [];
  wardValues : String[] = [];

  tempDistrictValues : any[] =[];
  searchForm: FormGroup = new FormGroup({});
  isShowing: boolean;

  constructor(
    public routes : Router,
    public http: HttpClient,
    protected formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      number: [''],
      owner: [''],
      province: [''],
      district: [''],
      ward: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      console.log(data);
      this.addressValues = data;
      data.forEach((element : any) => {
        this.provinceValues.push(element.name);
      });
    })
  }

  onSearch() {
    console.log(this.searchForm.value);
  }

  onResetForm() {
    this.searchForm.reset();
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
