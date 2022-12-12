import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditFamilyRegisterComponent} from "./add-edit-family-register/add-edit-family-register.component";

@Component({
  selector: 'app-family-register',
  templateUrl: './family-register.component.html',
  styleUrls: ['./family-register.component.css']
})
export class FamilyRegisterComponent implements OnInit {
  addressValues: any[] = [];
  provinceValues: String[] = [];
  districtValues: String[] = [];
  wardValues: String[] = [];

  tempDistrictValues: any[] = [];
  searchForm: FormGroup = new FormGroup({});
  isShowing: boolean;
  isEdit: boolean;

  familyRegisters: any;
  afterFilter: any;
  displayedColumns: string[] = ['number', 'owner', 'province', 'district', 'ward', 'address', ' '];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public routes: Router,
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
      data.forEach((element: any) => {
        this.provinceValues.push(element.name);
      });
    });
    this.http.get<any>('http://localhost:8080/family-register').subscribe((data) => {
      this.familyRegisters = new MatTableDataSource<FamilyRegister>(data);
      this.familyRegisters.paginator = this.paginator;
      this.afterFilter = this.familyRegisters.data;
    });
  }

  onSearch() {
    const formValue = `${this.searchForm.get('number')?.value}${this.searchForm.get('owner')?.value}${this.searchForm.get('province')?.value}${this.searchForm.get('district')?.value}${this.searchForm.get('ward')?.value}${this.searchForm.get('address')?.value}`;
    this.familyRegisters.filter = formValue.trim().toLowerCase();
    this.afterFilter = this.familyRegisters.filteredData;
    console.log(this.afterFilter);
  }

  onResetForm() {
    this.searchForm.patchValue({
      number: '',
      owner: '',
      province: '',
      district: '',
      ward: '',
      address: ''
    });
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

  addEditFamilyRegister(fr: any) {
    this.dialog.open(AddEditFamilyRegisterComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-family-register',
        data: fr ? fr : null,
      })
      .afterClosed().subscribe(result => {
      this.http.get<any>('http://localhost:8080/family-register').subscribe((data) => {
        this.familyRegisters = new MatTableDataSource<FamilyRegister>(data);
        this.familyRegisters.paginator = this.paginator;
      })
    });
  }

  onDelete(index: number) {
    console.log(index);
    console.log(this.paginator.pageSize, this.paginator.pageIndex);
    const deleteId = this.familyRegisters[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index].id;
    console.log(deleteId);
    this.http.delete<any>(`http://localhost:8080/family-register/${deleteId}`).subscribe();
    this.http.get<any>('http://localhost:8080/family-register').subscribe((data) => {
      this.familyRegisters = new MatTableDataSource<FamilyRegister>(data);
      this.familyRegisters.paginator = this.paginator;
    })
  }

  openDialogDetails(index: number): void {
    this.dialog.open(AddEditFamilyRegisterComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-family-register',
        data: this.afterFilter[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index],
        id: "-1"
      });
  }

  onEdit(index: number): void {
    this.dialog.open(AddEditFamilyRegisterComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-family-register',
        data: this.afterFilter[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index],
      }).afterClosed().subscribe(result => {
      this.http.get<any>('http://localhost:8080/family-register').subscribe((data) => {
        this.familyRegisters = new MatTableDataSource<FamilyRegister>(data);
        this.familyRegisters.paginator = this.paginator;
      })
    });
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  goLogout() {
    this.routes.navigate(['login']);
  }

  goFamilyRegisters() {
    this.routes.navigate(['family-register']);
  }

  goPeople() {
    this.routes.navigate(['people']);
  }

  goCharge() {
    this.routes.navigate(['charge']);
  }

}

export interface FamilyRegister {
  number: number;
  owner: string;
  province: string;
  district: string;
  ward: string;
  address: string;
}
