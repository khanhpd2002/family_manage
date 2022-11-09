import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReactiveFormComponent} from "../reactive-form/reactive-form.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addressValues : any[] = [];
  provinceValues : String[] = [];
  districtValues : String[] = [];
  wardValues : String[] = [];

  tempDistrictValues : any[] =[];
  searchForm: FormGroup = new FormGroup({});
  isShowing: boolean;

  familyRegisters: any;
  displayedColumns: string[] = ['number', 'owner', 'province', 'district', 'ward', 'address', ' '];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public routes : Router,
    public http: HttpClient,
    protected formBuilder: FormBuilder,
    private dialog: MatDialog) {
    this.searchForm = this.formBuilder.group({
      number: [''],
      owner: [''],
      province: [''],
      district: [''],
      ward: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      this.addressValues = data;
      data.forEach((element : any) => {
        this.provinceValues.push(element.name);
      });
    })
    this.http.get<any>('http://localhost:8080/family-register/getAll/').subscribe((data) => {
      this.familyRegisters = new MatTableDataSource(data);
      this.familyRegisters.paginator = this.paginator;
    })
  }

  onSearch() {
    const formValue = `${this.searchForm.get('number')?.value}${this.searchForm.get('owner')?.value}${this.searchForm.get('province')?.value}${this.searchForm.get('district')?.value}${this.searchForm.get('ward')?.value}${this.searchForm.get('address')?.value}`;
    console.log(formValue);
    this.familyRegisters.filter = formValue.trim().toLowerCase();
    this.familyRegisters = this.familyRegisters
      .filter((e: any) => {
        const isNumber = e.number.includes(this.searchForm.get('number')?.value)
      })
  }

  onResetForm() {
    this.searchForm.reset();
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

  deleteData(index: number) {

  }

  openDialogDetails(index: number) {

  }

  editData(index: number) {

  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }
  logout() {
    this.routes.navigate(['login']);
  }
  about() {
    this.routes.navigate(['about']);
  }

  addEditFamilyRegister(fr: any) {
    this.dialog.open(ReactiveFormComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-reactive-form',
        data: fr ? fr : null,
      })
      .afterClosed().subscribe(result => {
        if (result?.value) {
          console.log(result?.value);
      }
    });
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
