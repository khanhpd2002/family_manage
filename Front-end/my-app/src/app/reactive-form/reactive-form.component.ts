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

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})

export class ReactiveFormComponent {
  constructor (
    private fb: FormBuilder,
    public router: Router,
    public dataPassing : DataPassingService,
    // public serverHttp: ServerHttpService
    ) {}
  
  form = this.fb.group({
    name: new FormControl(null, [Validators.required]),
    address: new FormControl (null, [Validators.required]),
    phone: new FormControl (null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl (null, [Validators.required, Validators.email])
  })


  onSubmit() {
    const childData : PeriodicElement = {address: this.form.controls['address'].value, name: this.form.controls['name'].value, phone: this.form.controls['phone'].value, email: this.form.controls['email'].value};
    this.dataPassing.addData(childData);
    // this.serverHttp.postProfile(childData);
    this.router.navigate(['table']);
    this.form.reset();
  }
}

export interface PeriodicElement {
  name: any;
  address: any;
  phone: any;
  email: any;
}