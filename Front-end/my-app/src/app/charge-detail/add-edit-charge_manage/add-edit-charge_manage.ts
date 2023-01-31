import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {People} from "../../models/people.model";
import { Charge } from 'src/app/models/charge.models';

@Component({
  selector: 'app-add-edit-charge_mmanage',
  templateUrl: './add-edit-charge_manage.html',
  styleUrls: ['./add-edit-charge_manage.css']
})

export class AddEditCharge_manageComponent implements OnInit {
  // charge_typeValues = ['Voluntary', 'Mandatory'];
  isEdit : boolean = false;
  searchForm: FormGroup = new FormGroup({});
  charge: Charge;
  charge_id: any;
  familyValues: any[] = [];

  constructor(
    private router: ActivatedRoute,
    protected formBuilder: FormBuilder,
    // public router: Router,
    protected http: HttpClient,
    public dialogRef: MatDialogRef<AddEditCharge_manageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  addEditForm = this.formBuilder.group({
    // id: [this.charge.id],
    number: null,
    amount: null,
    payer: '',
    pay_date: ''
  })

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/family-register').subscribe((data: any) => {
      data.forEach((element: any) => {
        this.familyValues.push(element);
      })
    })

    // // Neu View thi disable tat ca cac field
    // if (this.dialogRef.id === '-1') {
    //   this.isView = true;
    //   this.addEditForm.controls['name'].disable();
    //   this.addEditForm.controls['amount'].disable();
    //   this.addEditForm.controls['charge_type'].disable();
    // }
    // console.log(this.dialogRef.id);
    // // Check neu ton tai charge thi patch Value vao form

    this.charge_id = this.data.charge_id;
    if (this.data.family_number) {
      // console.log("hii");
      this.isEdit = true;
      console.log(JSON.stringify(this.data));
      this.addEditForm.patchValue({
        number: this.data.family_number,
        amount: this.data.amount,
        payer: this.data.payer,
        pay_date: this.data.pay_date,
      })
      this.addEditForm.controls['number'].disable();
    }
  }

  onSubmit() {
    const newCharge_manage = {
      charge_id: this.charge_id,
      family_number: this.addEditForm.controls['number'].value,
      amount: this.addEditForm.controls['amount'].value,
      payer: this.addEditForm.controls['payer'].value,
      pay_date: this.addEditForm.controls['pay_date'].value,
    };
    // Tuy trang thai se goi method post/patch tuong ung
    if (this.isEdit) {
      this.http.patch(`http://localhost:8080/charge_manage/params?charge_id=${this.charge_id}&family_number=${this.data.family_number}`, newCharge_manage)
      .subscribe(data => {});
    }
    else {
      console.log(JSON.stringify(newCharge_manage));
      this.http.post<any>(`http://localhost:8080/charge_manage`, newCharge_manage).subscribe(
        charge_manage => console.log(JSON.stringify(charge_manage))
      );
    }
    this.dialogRef.close({data: newCharge_manage});
  }
}
