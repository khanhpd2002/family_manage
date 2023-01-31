import {AfterViewInit, Component, Inject, ViewChild, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Route, Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import { FamilyRegister } from 'src/app/models/family-register.models';
import { People } from 'src/app/models/people.model';

@Component({
  selector: 'app-add-edit-family-register',
  templateUrl: './add-edit-family-register.component.html',
  styleUrls: ['./add-edit-family-register.component.scss']
})

export class AddEditFamilyRegisterComponent implements OnInit {
  isAdding: boolean = false;
  isEditting: boolean = false;
  ifOwnerChange: boolean = false;
  memberExceptOwner: People[];
  thisIsMyForm: FormGroup;
  owner: any;
  ownerValues: any[] = [];
  owner_old: People;
  owner_new: People;
  addressValues: any[] = [];
  provinceValues: String[] = [];
  districtValues: String[] = [];
  wardValues: String[] = [];
  relationshipValues: String[] = ['WIFE', 'SON', 'DAUGHTER'];
  tempDistrictValues: any[] = [];
  isView = false;
  searchForm: FormGroup = new FormGroup({});

  constructor(
    protected formBuilder: FormBuilder,
    public router: Router,
    protected http: HttpClient,
    public dialogRef: MatDialogRef<AddEditFamilyRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public familyRegister: FamilyRegisters,
    private toastr: ToastrService) {
      this.thisIsMyForm = new FormGroup({
        formArrayName: this.formBuilder.array([])
      })

    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      this.addressValues = data;
      data.forEach((element: any) => {
        this.provinceValues.push(element.name);
      });
    })
  }

  buildForm() {
    const controlArray = this.thisIsMyForm.get('formArrayName') as FormArray;

    for (let i=0; i<this.familyRegister.memberFamily.length-1;i++) {
      controlArray.push(
        this.formBuilder.group({
          "name": new FormControl(),
        })
      )
    }

    console.log(controlArray.controls)
  }

  addEditForm = this.formBuilder.group({
    number: null,
    owner_name:'',
    owner: this.formBuilder.group({
      name: '',
      othername: '',
      birthday: '',
      province:  '',
      district:  '',
      ward:  '',
      address:  '',
      placeOfBirth:'',
      ethnic: '',
      placeOfJob:'',
      identityCard: '',
      // family_number: '',
      // relationshipWithOwner: '',
      note: '',
    }),
    province: '',
    district: '',
    ward: '',
    address: '',
    // name: new FormControl(null, [Validators.required]),
    // address: new FormControl (null, [Validators.required]),
    // phone: new FormControl (null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    // email: new FormControl (null, [Validators.required, Validators.email])
  })

  ngOnInit() {

    // if (this.dialogRef.id === '-1') {
    //   this.isView = true;
    //   this.addEditForm.controls['number'].disable();
    //   // this.addEditForm.controls['owner'].disable();
    //   this.addEditForm.controls['province'].disable();
    //   this.addEditForm.controls['district'].disable();
    //   this.addEditForm.controls['ward'].disable();
    //   this.addEditForm.controls['address'].disable();
    // }
    // Check neu ton tai familyRegister thi patch Value vao form
    console.log(JSON.stringify(this.familyRegister));
    if (this.familyRegister.number) {
      this.buildForm();

      this.isEditting = true;
      console.log("name" + JSON.stringify(this.familyRegister.owner));

      this.addEditForm.patchValue({
        owner_name: this.familyRegister.owner
      });
      // console.log("daynua"+this.addEditForm.controls['owner_name'].value);
      this.addEditForm.patchValue({
        ward: this.familyRegister.ward
      });
      this.addEditForm.patchValue({
        number: this.familyRegister.number
      });
      this.addEditForm.patchValue({
        province: this.familyRegister.province
      });
      this.addEditForm.patchValue({
        district: this.familyRegister.district
      });
      // console.log(JSON.stringify("hihi"+this.owner_old));
      this.http.get<any>(`http://localhost:8080/people/family/${this.familyRegister.number}`).subscribe((data: any) => {
        console.log("here"+JSON.stringify(this.familyRegister));
        data.forEach((element: any) => {
          this.ownerValues.push(element);
        })
      })

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
        const temp = this.tempDistrictValues[0].districts;
        const tempWardValues = temp
          .filter((a: any) => a.name === this.familyRegister.district);
        tempWardValues[0].wards.forEach((element: any) => {
          this.wardValues.push(element.name);
        })
      })
    }
    else this.isAdding = true;
    console.log("daynua"+this.addEditForm.controls['owner_name'].value);
  }

  onSubmit() {

    if (this.addEditForm.controls['owner'].controls['name'].value)
      this.owner = this.addEditForm.controls['owner'].controls['name'].value;
    else this.owner = this.addEditForm.controls['owner_name'].value;

    const data= {
      number: this.addEditForm.controls['number'].value,
      owner: this.owner ,
      province: this.addEditForm.controls['province'].value,
      district: this.addEditForm.controls['district'].value,
      ward: this.addEditForm.controls['ward'].value,
      address: this.addEditForm.controls['address'].value
    };
    const data_owner ={
      id: null,
      name: this.addEditForm.controls['owner'].controls['name'].value,
      otherName: this.addEditForm.controls['owner'].controls['othername'].value,
      birthday: this.addEditForm.controls['owner'].controls['birthday'].value,
      province: this.addEditForm.controls['owner'].controls['province'].value,
      district: this.addEditForm.controls['owner'].controls['district'].value,
      ward: this.addEditForm.controls['ward'].value,
      address: this.addEditForm.controls['owner'].controls['address'].value,
      placeOfBirth: this.addEditForm.controls['owner'].controls['placeOfBirth'].value,
      ethnic: this.addEditForm.controls['owner'].controls['ethnic'].value,
      placeOfJob: this.addEditForm.controls['owner'].controls['placeOfJob'].value,
      identityCard: this.addEditForm.controls['owner'].controls['identityCard'].value,
      family_number: this.addEditForm.controls['number'].value,
      relationshipWithOwner: 'OWNER',
      note: this.addEditForm.controls['owner'].controls['note'].value,
    }
    // Tuy trang thai se goi method post/patch tuong ung
    if (this.isEditting) {
      console.log("hi1"+JSON.stringify(this.ownerValues));
      var relation:any = this.thisIsMyForm.value.formArrayName;
      console.log(JSON.stringify(relation));
      for (let i = 0; i < this.memberExceptOwner.length; i++){
        this.memberExceptOwner[i].relationshipWithOwner = relation[i].name;
        console.log(this.memberExceptOwner[i].relationshipWithOwner);
        console.log(relation[i].name);
      }
      console.log("re"+JSON.stringify(this.memberExceptOwner));
      this.memberExceptOwner
      this.owner_old = this.ownerValues.filter(owner => {
        // console.log("choose"+JSON.stringify(owner));
        if(owner.name == this.familyRegister.owner) return true;
        return false;
      })[0];

      this.owner_new = this.ownerValues.filter(owner => {
        if(owner.name == this.owner) return true;
        return false;
      })[0];

      console.log("new"+JSON.stringify(this.owner_new));
      console.log("old"+JSON.stringify(this.owner_old));

      this.http.patch(`http://localhost:8080/family-register/${this.familyRegister.number}`, data).subscribe(data => {
        if (this.owner_new.name != this.owner_old.name){
          this.owner_new.relationshipWithOwner = "OWNER";
          this.http.patch(`http://localhost:8080/people/${this.owner_new.id}`, this.owner_new);

          for (let i=0; i < this.memberExceptOwner.length; i++){
            this.http.patch(`http://localhost:8080/people/${this.memberExceptOwner[i]}`, this.memberExceptOwner[i]);
          }
        }
      });
      this.toastr.success('Sửa thành công');
    } else {
      this.http.post<any>('http://localhost:8080/family-register', data).subscribe(data => {
        if (data) {
          this.http.post<any>('http://localhost:8080/people', data_owner).subscribe(data => {
            if (data) {
              this.toastr.success('Thêm mới thành công');
            }
            else {
              this.toastr.error('Thêm mới thất bại');
            }
          })

        }
        else {
          this.toastr.error('Thêm mới thất bại');
        }
      });
    }
    this.dialogRef.close({data:data});
  }

  ownerChange(event: any) {
    if(this.familyRegister.owner != event.value){
      console.log(event.value);
      this.ifOwnerChange = true;
      this.memberExceptOwner = this.ownerValues.filter(member => {
        if (member.name == event.value) return false;
        return true;
      });
    }
    else this.ifOwnerChange = false;
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
  memberFamily: any;
}
