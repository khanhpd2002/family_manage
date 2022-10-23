import {AfterViewInit, Component, EventEmitter, inject, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Route, Router } from '@angular/router';
import { style } from '@angular/animations';
import { DataPassingService } from '../Services/data-passing.service';
import { ActivatedRoute } from '@angular/router';
import { ServerHttpService } from '../Services/server-http.service';
  
var ELEMENT_DATA: PeriodicElement[] = [
  {address: 'ND', name: 'Duc Cop', phone: '1213123123', email: 'duc@gmail.com'},
  {address: 'HCM', name: 'Tan', phone: '1234567890', email: 'tan@gmail.com'},
  {address: 'BD', name: 'Thao', phone: '0987612345', email: 'anh@gmail.com'},
  {address: 'VP', name: 'pan1da', phone: '0987654321', email: 'khanh@gmail.com'},
];


export interface PeriodicElement {
  name: any;
  address: any;
  phone: any;
  email: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  constructor (
    public dialog : MatDialog,
    public router: Router,
    public dataPassing: DataPassingService,
  ) {
    dataPassing.data = ELEMENT_DATA;
  }



  displayedColumns: string[] = ['Address', 'Name', 'Phone', 'Email', ' '];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  searchText = '';
  name: string = '';
  address: string = '';
  phone: string = '';
  email: string = '';
  indexEdit : any;
  i : any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showAddForm(): void{
    this.router.navigate(['reactiveform']);
  }

  deleteData(index : number) {
    this.dataSource.data.splice((this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index , 1);
    this.updateDataSource();
  }

  editData(index: number) {
    this.i = (this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index;
    this.router.navigate([`table-edit/${this.i}`]);
    this.dataPassing.getIndex((this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index);
  }

  updateDataSource() {
    this.dataSource._updateChangeSubscription();
  }

  openDialogDetails(index: number): void {
    const dialogRef = this.dialog.open(DialogDetailsComponent, {
      width: '300px',
      data: this.dataSource.data[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index],
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result.name;
      this.address = result.address;
      this.phone = result.phone;
      this.email = result.email;
    })
  }
  
}

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css']
})

export class DialogDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css']
})

export class EditTableComponent {
  constructor (
    private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public dataPassing : DataPassingService
    ) {}

  public id: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId['id'];
      console.log(this.id);
  });
  }
  

  form = this.fb.group({
    name: new FormControl(this.dataPassing.data[this.dataPassing.tempIndex].name, [Validators.required]),
    address: new FormControl (this.dataPassing.data[this.dataPassing.tempIndex].address, [Validators.required]),
    phone: new FormControl (this.dataPassing.data[this.dataPassing.tempIndex].phone, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl (this.dataPassing.data[this.dataPassing.tempIndex].email, [Validators.required, Validators.email])
  })

  onSubmit() {
    const childData : PeriodicElement = {address: this.form.controls['address'].value, name: this.form.controls['name'].value, phone: this.form.controls['phone'].value, email: this.form.controls['email'].value};
    this.dataPassing.data[this.dataPassing.tempIndex] = childData;
    this.router.navigate(['table']);
    this.form.reset();
  }

  back() {
    this.router.navigate(['table']);
  }
}
