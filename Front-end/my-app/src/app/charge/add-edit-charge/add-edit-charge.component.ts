import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import { Charge } from 'src/app/models/charge.models';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-edit-charge',
  templateUrl: './add-edit-charge.component.html',
  styleUrls: ['./add-edit-charge.component.css']
})

export class AddEditChargeComponent implements OnInit {
  charge_typeValues = ['Bắt buộc', 'Tự nguyện'];
  isEdit : boolean = false;
  searchForm: FormGroup = new FormGroup({});
  charge: Charge;
  id: any;
  constructor(
    protected formBuilder: FormBuilder,
    public router: Router,
    protected http: HttpClient,
    public dialogRef: MatDialogRef<AddEditChargeComponent>,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addEditForm = this.formBuilder.group({
    // id: [this.charge.id],
    name: '',
    amount: null,
    charge_type: '',
  })

  ngOnInit() {
    // // Neu View thi disable tat ca cac field
    // if (this.dialogRef.id === '-1') {
    //   this.isView = true;
    //   this.addEditForm.controls['name'].disable();
    //   this.addEditForm.controls['amount'].disable();
    //   this.addEditForm.controls['charge_type'].disable();
    // }
    // console.log(this.dialogRef.id);
    // // Check neu ton tai charge thi patch Value vao form
    if (this.data.name) {
      this.id = this.data.id;
      this.isEdit = true;
      this.addEditForm.patchValue({
        name: this.data.name,
        amount: this.data.amount,
        charge_type: this.data.charge_type
      })
    }
    else this.id = null;
  }

  onSubmit() {
    var newCharge = {
      id: this.id,
      name: this.addEditForm.controls['name'].value,
      amount: this.addEditForm.controls['amount'].value,
      charge_type: this.addEditForm.controls['charge_type'].value,
    };
    // Tuy trang thai se goi method post/patch tuong ung
    if (this.isEdit) {
      this.http.patch(`http://localhost:8080/charge/${this.data.id}`, newCharge).subscribe(data => {
        this.toastr.success('Sửa thành công');
      });
    }
    else {
      console.log(JSON.stringify(newCharge));
      this.http.post<any>('http://localhost:8080/charge', newCharge).subscribe(charge => {
          newCharge = charge;
          this.toastr.success('Thêm mới thành công');
        }
      );
    }
    this.dialogRef.close({data: newCharge});
  }
}
