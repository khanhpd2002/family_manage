import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditPeopleComponent} from "./add-edit-people/add-edit-people.component";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  addressValues: any[] = [];
  provinceValues: String[] = [];
  districtValues: String[] = [];
  wardValues: String[] = [];

  tempDistrictValues: any[] = [];
  searchForm: FormGroup = new FormGroup({});
  isShowing: boolean;
  isEdit: boolean;
  isAdvancedSearch: boolean;

  people: any;
  afterFilter: any;
  displayedColumns: string[] = ['name', 'birthday', 'province', 'district', 'ward',
    'address', 'placeOfBirth', 'ethnic', 'placeOfJob', 'identityCard', 'relationshipWithOwner', 'note', ' '];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public routes: Router,
    public http: HttpClient,
    protected formBuilder: FormBuilder,
    private dialog: MatDialog) {
    this.searchForm = this.formBuilder.group({
      name: [''],
      otherName: [''],
      province: [''],
      district: [''],
      ward: [''],
      address: [''],
      placeOfBirth: [''],
      ethnic: [''],
      placeOfJob: [''],
      identityCard: [''],
      familyId: [''],
      relationshipWithOwner: [''],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.http.get<any>('https://provinces.open-api.vn/api/?depth=3').subscribe((data) => {
      this.addressValues = data;
      data.forEach((element: any) => {
        this.provinceValues.push(element.name);
      });
    });
    this.http.get<any>('http://localhost:8080/people').subscribe((data) => {
      this.people = new MatTableDataSource<People>(data);
      this.people.paginator = this.paginator;
      this.afterFilter = this.people.data;
    });
  }

  onSearch() {
    const formValue = `${this.searchForm.get('name')?.value}${this.searchForm.get('otherName')?.value}${this.searchForm.get('province')?.value}${this.searchForm.get('district')?.value}${this.searchForm.get('ward')?.value}${this.searchForm.get('address')?.value}`;
    this.people.filter = formValue.trim().toLowerCase();
    this.afterFilter = this.people.filteredData;
    console.log(this.afterFilter);
  }

  onResetForm() {
    this.searchForm.patchValue({
      name: '',
      otherName: '',
      province: '',
      district: '',
      ward: '',
      address: '',
      placeOfBirth: '',
      ethnic: '',
      placeOfJob: '',
      identityCard: '',
      familyId: '',
      relationshipWithOwner: '',
      note: '',
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

  addEditPeople(fr: any) {
    this.dialog.open(AddEditPeopleComponent,
      {
        width: '500px',
        height: '1000px',
        disableClose: false,
        panelClass: 'app-add-edit-people',
        data: fr ? fr : null,
      })
      .afterClosed().subscribe(result => {
      this.http.get<any>('http://localhost:8080/people').subscribe((data) => {
        this.people = new MatTableDataSource<People>(data);
        this.people.paginator = this.paginator;
      })
    });
  }

  onDelete(index: number) {
    console.log(index);
    console.log(this.paginator.pageSize, this.paginator.pageIndex);
    const deleteId = this.people[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index].id;
    console.log(deleteId);
    this.http.delete<any>(`http://localhost:8080/people/${deleteId}`).subscribe();
    this.http.get<any>('http://localhost:8080/people').subscribe((data) => {
      this.people = new MatTableDataSource<People>(data);
      this.people.paginator = this.paginator;
    })
  }

  openDialogDetails(index: number): void {
    this.dialog.open(AddEditPeopleComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-people',
        data: this.afterFilter[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index],
        id: "-1"
      });
  }

  onEdit(index: number): void {
    this.dialog.open(AddEditPeopleComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-people',
        data: this.afterFilter[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index],
      }).afterClosed().subscribe(result => {
      this.http.get<any>('http://localhost:8080/people').subscribe((data) => {
        this.people = new MatTableDataSource<People>(data);
        this.people.paginator = this.paginator;
      })
    });
  }

  toggleAdvancedSearch() {
    this.isAdvancedSearch = !this.isAdvancedSearch;
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

export interface People {
  name: any;
  otherName: any;
  birthday: any;
  province: any;
  district: any;
  ward: any;
  address: any;
  placeOfBirth: any;
  ethnic: any;
  placeOfJob: any;
  identityCard: any;
  familyId: any;
  relationshipWithOwner: any;
  note: any;
}
