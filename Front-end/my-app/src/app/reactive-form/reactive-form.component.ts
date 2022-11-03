import {AfterViewInit, Component, Inject, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Route, Router } from '@angular/router';
import { DataPassingService } from '../Services/data-passing.service';
import { ServerHttpService } from '../Services/server-http.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})

export class ReactiveFormComponent {
  addressValues : any[] = [];
  provinceValues : String[] = [];
  districtValues : String[] = [];
  wardValues : String[] = [];

  tempDistrictValues : any[] =[];
  searchForm: FormGroup = new FormGroup({});
  constructor (
    protected formBuilder: FormBuilder,
    public router: Router,
    public dataPassing : DataPassingService,
    protected http: HttpClient,
    ) {
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      console.log(data);
      this.addressValues = data;
      data.forEach((element : any) => {
        this.provinceValues.push(element.name);
      });
    })
  }

  addEditForm = this.formBuilder.group({
    number: [''],
    owner: [''],
    province: [''],
    district: [''],
    ward: [''],
    address: [''],
    // name: new FormControl(null, [Validators.required]),
    // address: new FormControl (null, [Validators.required]),
    // phone: new FormControl (null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    // email: new FormControl (null, [Validators.required, Validators.email])
  })


  onSubmit() {
    // const childData : PeriodicElement = {address: this.addEditForm.controls['address'].value, name: this.addEditForm.controls['name'].value, phone: this.addEditForm.controls['phone'].value, email: this.addEditForm.controls['email'].value};
    // this.dataPassing.addData(childData);
    // this.serverHttp.postProfile(childData);
    this.router.navigate(['table']);
    this.addEditForm.reset();
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
}

export interface FamilyRegisters {
  number: number;
  owner: string;
  province: string;
  district: string;
  ward: string;
  address: string;
}
