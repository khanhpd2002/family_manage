import {AfterViewInit, Component, Inject, ViewChild, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Route, Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-edit-family-register',
  templateUrl: './add-edit-family-register.component.html',
  styleUrls: ['./add-edit-family-register.component.scss']
})

export class AddEditFamilyRegisterComponent implements OnInit {
  addressValues: any[] = [];
  provinceValues: String[] = [];
  districtValues: String[] = [];
  wardValues: String[] = [];

  tempDistrictValues: any[] = [];
  isView = false;
  searchForm: FormGroup = new FormGroup({});

  constructor(
    protected formBuilder: FormBuilder,
    public router: Router,
    protected http: HttpClient,
    public dialogRef: MatDialogRef<AddEditFamilyRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public familyRegister: any,
    private toastr: ToastrService) {
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      this.addressValues = data;
      data.forEach((element: any) => {
        this.provinceValues.push(element.name);
      });
    })
  }

  addEditForm = this.formBuilder.group({
    number: [this.familyRegister.number],
    owner: [this.familyRegister.owner],
    province: [this.familyRegister.province],
    district: [this.familyRegister.district],
    ward: [this.familyRegister.ward],
    address: [this.familyRegister.address],
    // name: new FormControl(null, [Validators.required]),
    // address: new FormControl (null, [Validators.required]),
    // phone: new FormControl (null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    // email: new FormControl (null, [Validators.required, Validators.email])
  })

  ngOnInit() {
    if (this.dialogRef.id === '-1') {
      this.isView = true;
      this.addEditForm.controls['number'].disable();
      this.addEditForm.controls['owner'].disable();
      this.addEditForm.controls['province'].disable();
      this.addEditForm.controls['district'].disable();
      this.addEditForm.controls['ward'].disable();
      this.addEditForm.controls['address'].disable();
    }
    console.log(this.dialogRef.id);
    // Check neu ton tai familyRegister thi patch Value vao form
    if (this.familyRegister.id) {
      this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
        this.addressValues = data;
        data.forEach((element: any) => {
          this.provinceValues.push(element.name);
        });
        this.tempDistrictValues = this.addressValues
          .filter(a => a.name === this.familyRegister.province);
        this.tempDistrictValues[0].districts.forEach((element: any) => {
          this.districtValues.push(element.name);
        })
        this.addEditForm.patchValue({
          district: this.familyRegister.district
        });
        const temp = this.tempDistrictValues[0].districts;
        const tempWardValues = temp
          .filter((a: any) => a.name === this.familyRegister.district);
        tempWardValues[0].wards.forEach((element: any) => {
          this.wardValues.push(element.name);
        })
        this.addEditForm.patchValue({
          ward: this.familyRegister.ward
        });
      })
    }
  }

  onSubmit() {
    const data: FamilyRegisters = {
      number: this.addEditForm.controls['number'].value,
      owner: this.addEditForm.controls['owner'].value,
      province: this.addEditForm.controls['province'].value,
      district: this.addEditForm.controls['district'].value,
      ward: this.addEditForm.controls['ward'].value,
      address: this.addEditForm.controls['address'].value
    };
    // Tuy trang thai se goi method post/patch tuong ung
    if (this.familyRegister.id) {
      this.http.patch(`http://localhost:8080/family-register/${this.familyRegister.id}`, data).subscribe(data => {
        this.toastr.success('Sửa thành công');
      });
    } else {
      this.http.post<any>('http://localhost:8080/family-register', data).subscribe(data => {
        if (data) {
          this.toastr.success('Thêm mới thành công');
        }
        else {
          this.toastr.error('Thêm mới thất bại');
        }
      });
    }
    this.dialogRef.close();
  }

  provinceChange(event: any) {
    this.districtValues = [];
    this.wardValues = [];
    this.tempDistrictValues = this.addressValues
      .filter(a => a.name === event.value);
    this.tempDistrictValues[0].districts.forEach((element: any) => {
      this.districtValues.push(element.name);
    })
  }

  districtChange(event: any) {
    this.wardValues = [];
    const temp = this.tempDistrictValues[0].districts;
    const tempWardValues = temp
      .filter((a: any) => a.name === event.value);
    tempWardValues[0].wards.forEach((element: any) => {
      this.wardValues.push(element.name);
    })
  }
}

export interface FamilyRegisters {
  number: any;
  owner: any;
  province: any;
  district: any;
  ward: any;
  address: any;
}
