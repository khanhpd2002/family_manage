import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {People} from "../../models/people.model";
import {TranslateModels} from "../../models/translate.models";
import {ToastrService} from "ngx-toastr";
import { RelationshipEnums } from 'src/app/models/relationship.enums';

@Component({
  selector: 'app-add-edit-people',
  templateUrl: './add-edit-people.component.html',
  styleUrls: ['./add-edit-people.component.scss']
})

export class AddEditPeopleComponent implements OnInit {
  id: any;
  addressValues: any[] = [];
  provinceValues: String[] = [];
  districtValues: String[] = [];
  wardValues: String[] = [];

  relationshipValues: TranslateModels[] = [{eng: 'OWNER', vie: 'Chủ hộ'},
                                    {eng: 'WIFE', vie: 'Vợ'},
                                    {eng: 'SON', vie: 'Con trai'},
                                    {eng: 'DAUGHTER', vie: 'Con gái'}];
  statusValues: TranslateModels[] = [{eng: 'PERMANENT', vie: 'Thường trú'},
                                    {eng: 'TEMPORARY', vie: 'Tạm trú'},
                                    {eng: 'ABSENT', vie: 'Tạm vắng'},
                                    {eng: 'DIED', vie: 'Đã mất'}];
  familyValues: any[] = [];

  tempDistrictValues: any[] = [];
  isView = false;
  startDate: Date | null;
  searchForm: FormGroup = new FormGroup({});

  constructor(
    protected formBuilder: FormBuilder,
    public router: Router,
    protected http: HttpClient,
    public dialogRef: MatDialogRef<AddEditPeopleComponent>,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public people: any) {
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      this.addressValues = data;
      data.forEach((element: any) => {
        this.provinceValues.push(element.name);
      });
    })
    // if (this.people) {
    //   this.people.relationshipWithOwner = this.translateEnumToString(this.people.relationshipWithOwner);
    //   this.people.status = this.translateEnumToString(this.people.status);
    // }
  }

  addEditForm = this.formBuilder.group({
    name: '',
    otherName: '',
    birthday: '',
    province: '',
    district: '',
    ward: '',
    address: '',
    placeOfBirth: '',
    ethnic: '',
    placeOfJob: '',
    family_number: '',
    identityCard: '',
    relationshipWithOwner: '',
    status: '',
    note: ''
  })

  ngOnInit() {
    console.log(JSON.stringify(this.people));
    this.http.get<any>('http://localhost:8080/family-register').subscribe((data: any) => {
      data.forEach((element: any) => {
        this.familyValues.push(element);
      })
    })

    // Neu View thi disable tat ca cac field
    if (this.dialogRef.id === '-1') {
      this.id = this.people.id;
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
      this.addEditForm.controls['family_number'].disable();
      this.addEditForm.controls['status'].disable();
      this.addEditForm.controls['note'].disable();
    }
    // Check neu ton tai people thi patch Value vao form
    if (this.people) {
      this.id = this.people.id;
      console.log(this.people);
      this.people.relationshipWithOwner = this.translateEnumToString(this.people.relationshipWithOwner);
      this.people.status = this.translateEnumToString(this.people.status);
      console.log(this.formatDate(this.people.birthday));
      this.addEditForm.patchValue({
        name: this.people.name,
        otherName: this.people.otherName,
        birthday: this.formatDate(this.people.birthday),
        province: this.people.province,
        district: this.people.district,
        ward: this.people.ward,
        address: this.people.address,
        placeOfBirth: this.people.placeOfBirth,
        ethnic: this.people.ethnic,
        placeOfJob: this.people.placeOfJob,
        family_number: this.people.family_number,
        identityCard: this.people.identityCard,
        relationshipWithOwner: this.people.relationshipWithOwner,
        status: this.people.status,
        note: this.people.note,
      });
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
        const temp = this.tempDistrictValues[0].districts;
        const tempWardValues = temp
          .filter((a: any) => a.name === this.people.district);
        tempWardValues[0].wards.forEach((element: any) => {
          this.wardValues.push(element.name);
        })
      })
    }
    else{
      this.id = null;
      console.log("here");
    }
  }

  onSubmit() {
    console.log(this.getValidDate(this.addEditForm.controls['birthday'].value));
    const data = {
      id: this.id,
      name: this.addEditForm.controls['name'].value,
      otherName: this.addEditForm.controls['otherName'].value,
      birthday: this.getValidDate(this.addEditForm.controls['birthday'].value),
      province: this.addEditForm.controls['province'].value,
      district: this.addEditForm.controls['district'].value,
      ward: this.addEditForm.controls['ward'].value,
      address: this.addEditForm.controls['address'].value,
      placeOfBirth: this.addEditForm.controls['placeOfBirth'].value,
      ethnic: this.addEditForm.controls['ethnic'].value,
      placeOfJob: this.addEditForm.controls['placeOfJob'].value,
      identityCard: this.addEditForm.controls['identityCard'].value,
      family_number: this.addEditForm.controls['family_number'].value,
      relationshipWithOwner: this.addEditForm.controls['relationshipWithOwner'].value,
      status: this.addEditForm.controls['status'].value,
      note: this.addEditForm.controls['note'].value
    };
    // Tuy trang thai se goi method post/patch tuong ung
    if (this.people) {
      this.http.patch(`http://localhost:8080/people/${this.people.id}`, data).subscribe(data => {
        this.toastr.success('Sửa thành công');
      });
    }
    // else {
    //   if (data.relationshipWithOwner === 'OWNER') {
    //     const fr: FamilyRegister = new FamilyRegister;
    //     fr.owner = data.name;
    //     fr.province = data.province;
    //     fr.district = data.district;
    //     fr.ward = data.ward;
    //     fr.address = data.address;
    //     this.http.post<any>('http://localhost:8080/family-register', fr);
    //     this.http.post<any>('http://localhost:8080/people', data);
    //   }
      else {
        this.http.post<any>('http://localhost:8080/people', data).subscribe(data => {
          this.toastr.success('Thêm mới thành công');
        });
      }

    this.dialogRef.close({data: data});
  }

  clearStartDate() {
    this.startDate = null;
  }

  getValidDate(selectedDate: any) {
    const date = new Date(selectedDate);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
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
  translateEnumToString (relation: string) {
    if (relation === 'OWNER')
      return RelationshipEnums.OWNER;
    else if (relation === 'WIFE')
      return RelationshipEnums.WIFE;
    else if (relation === 'SON')
      return RelationshipEnums.SON;
    else if (relation === 'DAUGHTER')
      return RelationshipEnums.DAUGHTER;
    else if (relation === 'PERMANENT')
      return 'Thường trú';
    else if (relation === 'TEMPORARY')
      return 'Tạm trú';
    else if (relation === 'ABSENT')
      return 'Tạm vắng';
    else if (relation === 'DIED')
      return 'Đã mất';
    else
      return '';
  }

  formatDate(date: string) {
    const arr = date.split('-');
    return arr[1] + '/' + arr[2] + '/' + arr[0];
  }
}
