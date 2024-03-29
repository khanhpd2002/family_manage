import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditFamilyRegisterComponent} from "./add-edit-family-register/add-edit-family-register.component";
import {ToastrService} from "ngx-toastr";
import {FamilyRegister} from "../models/family-register.models";

@Component({
  selector: 'app-family-register',
  templateUrl: './family-register.component.html',
  styleUrls: ['./family-register.component.scss']
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
  familyList: Family[];
  familyRegisters: any;
  afterFilter: any;
  displayedColumns: string[] = ['number', 'owner', 'province', 'district', 'ward', 'address', ' '];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
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
    this.http.get<any>('http://localhost:8080/family-register').subscribe(( family ) => {
      this.familyList = family;
      this.familyRegisters = new MatTableDataSource<FamilyRegister>();
      this.familyRegisters.data = family;
      this.familyRegisters.paginator = this.paginator;
      this.afterFilter = this.familyRegisters.family;    })
    // this.http.get<any>('http://localhost:8080/family-register').subscribe((data) => {
    //   this.familyRegisters = new MatTableDataSource<FamilyRegister>(data);
    //   this.familyRegisters.paginator = this.paginator;
    //   this.afterFilter = this.familyRegisters.data;
    // });
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      this.addressValues = data;
      data.forEach((element: any) => {
        this.provinceValues.push(element.name);
      });
    });

  }

  onSearch() {
    const map = Object.fromEntries(
      ['number', 'owner', 'province', 'district', 'ward', 'address'].map(s => [s, s]));
    let params = this._collectParams(this.searchForm, map);
    console.log(params);
    this.http.get<any>('http://localhost:8080/family-register/params', {params: params}).subscribe((data) => {
      this.familyList = data;
      this.familyRegisters.data = data;
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
        this.familyList.push(result.data);
        this.familyRegisters.data = this.familyList;

      // this.onSearch();
    });
  }

  clickMethod(deleteId: number) {
    if(confirm("Bạn có chắc muốn xóa hộ khẩu số "+deleteId)) {
      this.onDelete(deleteId);
    }
  }

  async onDelete(number: number) {
    console.log(number);
    // console.log(this.paginator.pageSize, this.paginator.pageIndex);
    // console.log(this.afterFilter);
    // const deleteId = this.afterFilter[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index].id;
    // console.log(deleteId);
    this.http.delete<any>(`http://localhost:8080/family-register/${number}`).subscribe();
    this.http.get<any>('http://localhost:8080/family-register').subscribe((data) => {
      this.familyRegisters.familyRegisters.data = data;
    })
    this.toastr.success('Xóa thành công');
    setTimeout(() => this.onSearch(), 500)
  }

  openDialogDetails(family: FamilyRegister): void {
    this.dialog.open(AddEditFamilyRegisterComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-family-register',
        data: family,
        id: "-1"
      });
  }

  onEdit(family: FamilyRegister): void {
    // console.log(index);
    this.dialog.open(AddEditFamilyRegisterComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-family-register',
        data: family,
      }).afterClosed().subscribe(result => {
      this.http.get<any>('http://localhost:8080/family-register').subscribe((data) => {
        this.familyRegisters.data = data;
      })
    });
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  goList(number: any) {
    this.routes.navigate([`family-register/${number}`]);
  }

}

export interface Family {
  number: any;
  owner: any;
  province: any;
  district: any;
  ward: any;
  address: any;
}
