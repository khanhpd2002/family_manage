import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {People} from "../../models/people.model";
import {ToastrService} from "ngx-toastr";
import {TranslateModels} from "../../models/translate.models";

@Component({
  selector: 'app-change-status-people',
  templateUrl: './change-status-people.component.html',
  styleUrls: ['./change-status-people.component.scss']
})

export class ChangeStatusPeopleComponent implements OnInit {
  id: any;
  startDate: Date | null;
  endDate: Date | null;
  typeValues: TranslateModels[] = [{eng: 'PERMANENT  ', vie: 'Thường trú'},
                                  {eng: 'TEMPORARY', vie: 'Tạm trú'},
                                  {eng: 'ABSENT', vie: 'Tạm vắng'},
                                  {eng: 'DIED', vie: 'Đã mất'}];

  constructor(
    protected formBuilder: FormBuilder,
    public router: Router,
    protected http: HttpClient,
    public dialogRef: MatDialogRef<ChangeStatusPeopleComponent>,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public people: People) {}

  changeStatusForm = this.formBuilder.group({
    type: '',
    registerPhone: '',
    reason: '',
    from: '',
    to: '',
  })

  ngOnInit() {
  }

  onSubmit() {
    const people = {
      people_id: this.people.id,
      type: this.changeStatusForm.controls['type'].value,
      register_phone: this.changeStatusForm.controls['registerPhone'].value,
      dateFrom: this.getValidDate(this.changeStatusForm.controls['from'].value),
      dateTo: this.getValidDate(this.changeStatusForm.controls['to'].value),
      reason: this.changeStatusForm.controls['reason'].value,
    }
    console.log(people);
    this.http.post(`http://localhost:8080/administrative`, people).subscribe(data => {
      this.toastr.success('Thay đổi thủ tục thành công');
    })
    const changedPeople = this.people;
    if (changedPeople.relationshipWithOwner === 'Con trai')
      changedPeople.relationshipWithOwner = 'SON';
    if (changedPeople.relationshipWithOwner === 'Con gái')
      changedPeople.relationshipWithOwner = 'DAUGHTER';
    if (changedPeople.relationshipWithOwner === 'Vợ')
      changedPeople.relationshipWithOwner = 'WIFE';
    if (changedPeople.relationshipWithOwner === 'Chủ hộ')
      changedPeople.relationshipWithOwner = 'OWNER';

    changedPeople.status = this.changeStatusForm.controls['type'].value;
    this.http.patch(`http://localhost:8080/people/${this.people.id}`, changedPeople).subscribe(data => {
    })
    this.dialogRef.close({data: people});
  }

  clearStartDate() {
    this.startDate = null;
  }

  clearEndDate() {
    this.endDate = null;
  }

  getValidDate(selectedDate: any) {
    const date = new Date(selectedDate);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
}
