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

@Component({
  selector: 'app-add-edit-peop;e',
  templateUrl: './add-edit-people.component.html',
  styleUrls: ['./add-edit-people.component.scss']
})

export class AddEditPeopleComponent implements OnInit {
  addressValues: any[] = [];
  provinceValues: String[] = [];
  districtValues: String[] = [];
  wardValues: String[] = [];

  relationshipValues = ['OWNER', 'WIFE', 'SON', 'DAUGHTER'];
  familyValues: any[] = [];

  tempDistrictValues: any[] = [];
  isView = false;
  searchForm: FormGroup = new FormGroup({});

  constructor(
    protected formBuilder: FormBuilder,
    public router: Router,
    protected http: HttpClient,
    public dialogRef: MatDialogRef<AddEditPeopleComponent>,
    @Inject(MAT_DIALOG_DATA) public people: any) {
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      this.addressValues = data;
      data.forEach((element: any) => {
        this.provinceValues.push(element.name);
      });
    })
  }

  addEditForm = this.formBuilder.group({
    name: [this.people.name],
    otherName: [this.people.otherName],
    birthday: [this.people.birthday],
    province: [this.people.province],
    district: [this.people.district],
    ward: [this.people.ward],
    address: [this.people.address],
    placeOfBirth: [this.people.placeOfBirth],
    ethnic: [this.people.ethnic],
    placeOfJob: [this.people.placeOfJob],
    identityCard: [this.people.identityCard],
    relationshipWithOwner: [this.people.relationshipWithOwner],
    note: [this.people.note],

    // name: new FormControl(null, [Validators.required]),
    // address: new FormControl (null, [Validators.required]),
    // phone: new FormControl (null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    // email: new FormControl (null, [Validators.required, Validators.email])
  })

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/family-register').subscribe((data: any) => {
      data.forEach((element: any) => {
        this.familyValues.push(element.owner);
      })
    })

    // Neu View thi disable tat ca cac field
    if (this.dialogRef.id === '-1') {
      this.isView = true;
      this.addEditForm.controls['name'].disable();
      this.addEditForm.controls['otherName'].disable();
      this.addEditForm.controls['birthday'].disable();
      this.addEditForm.controls['province'].disable();
      this.addEditForm.controls['district'].disable();
      this.addEditForm.controls['ward'].disable();
      this.addEditForm.controls['address'].disable();
      this.addEditForm.controls['placeOfBirth'].disable();
      this.addEditForm.controls['ethnic'].disable();
      this.addEditForm.controls['placeOfJob'].disable();
      this.addEditForm.controls['identityCard'].disable();
      this.addEditForm.controls['relationshipWithOwner'].disable();
      this.addEditForm.controls['note'].disable();
    }
    console.log(this.dialogRef.id);
    // Check neu ton tai people thi patch Value vao form
    if (this.people.id) {
      this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
        this.addressValues = data;
        data.forEach((element: any) => {
          this.provinceValues.push(element.name);
        });
        this.tempDistrictValues = this.addressValues
          .filter(a => a.name === this.people.province);
        this.tempDistrictValues[0].districts.forEach((element: any) => {
          this.districtValues.push(element.name);
        })
        this.addEditForm.patchValue({
          district: this.people.district
        });
        const temp = this.tempDistrictValues[0].districts;
        const tempWardValues = temp
          .filter((a: any) => a.name === this.people.district);
        tempWardValues[0].wards.forEach((element: any) => {
          this.wardValues.push(element.name);
        })
        this.addEditForm.patchValue({
          ward: this.people.ward
        });
      })
    }
  }

  onSubmit() {
    const data: People = {
      name: this.addEditForm.controls['name'].value,
      otherName: this.addEditForm.controls['otherName'].value,
      birthday: this.addEditForm.controls['birthday'].value,
      province: this.addEditForm.controls['province'].value,
      district: this.addEditForm.controls['district'].value,
      ward: this.addEditForm.controls['ward'].value,
      address: this.addEditForm.controls['address'].value,
      placeOfBirth: this.addEditForm.controls['placeOfBirth'].value,
      ethnic: this.addEditForm.controls['ethnic'].value,
      placeOfJob: this.addEditForm.controls['placeOfJob'].value,
      identityCard: this.addEditForm.controls['identityCard'].value,
      relationshipWithOwner: this.addEditForm.controls['relationshipWithOwner'].value,
      note: this.addEditForm.controls['note'].value
    };
    // Tuy trang thai se goi method post/patch tuong ung
    if (this.people.id) {
      this.http.patch(`http://localhost:8080/people/${this.people.id}`, data).subscribe(data => {
      });
    } else {
      this.http.post<any>('http://localhost:8080/people', data).subscribe(data => {
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

export interface People {
  name: any;
  otherName: any;
  birthday: any;
  province: any;
  district: any;
  ward: any;
  address: any;
  placeOfBirth: any;
  ethnic: any;
  placeOfJob: any;
  identityCard: any;
  relationshipWithOwner: any;
  note: any;
}
