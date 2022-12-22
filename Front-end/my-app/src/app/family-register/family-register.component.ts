import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditFamilyRegisterComponent} from "./add-edit-family-register/add-edit-family-register.component";
import {ToastrService} from "ngx-toastr";

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
    private dialog: MatDialog,
    private toastr: ToastrService) {
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
    const map = Object.fromEntries(
      ['number', 'owner', 'province', 'district', 'ward', 'address'].map(s => [s, s]));
    let params = this._collectParams(this.searchForm, map);
    console.log(params);
    this.http.get<any>('http://localhost:8080/family-register/params', {params: params}).subscribe((data) => {
      this.familyRegisters = new MatTableDataSource<FamilyRegister>(data);
      this.familyRegisters.paginator = this.paginator;
      this.afterFilter = this.familyRegisters.data;
    });
  }

  _collectParams(searchForm: FormGroup, map: { [key: string]: string }): HttpParams {
    let params = new HttpParams();
    for (const key of Object.keys(map)) {
      const value = map[key];
      if (value) {
        const control = searchForm.get(value);
        if (control) {
          params = params.set(key, control.value ? control.value : '');
        }
      }
    }
    return params;
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
      this.onSearch();
    });
  }

  async onDelete(index: number) {
    console.log(index);
    console.log(this.paginator.pageSize, this.paginator.pageIndex);
    console.log(this.afterFilter);
    const deleteId = this.afterFilter[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index].id;
    console.log(deleteId);
    await this.http.delete<any>(`http://localhost:8080/family-register/${deleteId}`).subscribe();
    await this.http.get<any>('http://localhost:8080/family-register').subscribe((data) => {
      this.familyRegisters = new MatTableDataSource<FamilyRegister>(data);
      this.familyRegisters.paginator = this.paginator;
    })
    this.toastr.success('Xóa thành công');
    setTimeout(() => this.onSearch(), 500)
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
