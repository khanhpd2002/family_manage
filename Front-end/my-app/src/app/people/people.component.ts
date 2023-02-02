import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditPeopleComponent} from "./add-edit-people/add-edit-people.component";
import {People} from "../models/people.model";
import {FamilyRegister} from "../models/family-register.models";
import {RelationshipEnums} from "../models/relationship.enums";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  peopleList: People[];
  addressValues: any[] = [];
  provinceValues: String[] = [];
  districtValues: String[] = [];
  wardValues: String[] = [];

  tempDistrictValues: any[] = [];
  searchForm: FormGroup = new FormGroup({});
  isShowing: boolean;
  isEdit: boolean;
  isAdvancedSearch: boolean;
  startDate: Date | null;

  people: any;
  afterFilter: any;
  displayedColumns: string[] = ['name', 'birthday', 'province', 'district', 'ward',
    'address', 'placeOfBirth', 'ethnic', 'placeOfJob', 'identityCard', 'relationshipWithOwner','status', 'note', ' '];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    public routes: Router,
    public http: HttpClient,
    protected formBuilder: FormBuilder,
    private dialog: MatDialog) {
    this.searchForm = this.formBuilder.group({
      name: [''],
      otherName: [''],
      birthday: [''],
      province: [''],
      district: [''],
      ward: [''],
      address: [''],
      placeOfBirth: [''],
      ethnic: [''],
      placeOfJob: [''],
      identityCard: [''],
      family_number: [''],
      relationshipWithOwner: [''],
      status: [''],
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
    this.http.get<any>('http://localhost:8080/people').subscribe((people) => {
      people.forEach((element: any) => {
        element.relationshipWithOwner = this.translateEnumToString(element.relationshipWithOwner)
      });
      this.peopleList = people;
      this.people = new MatTableDataSource<People>();
      this.people.data = this.peopleList;
      this.people.paginator = this.paginator;
      this.afterFilter = this.people.data;
    });
  }

  onSearch() {
    const map = Object.fromEntries(
      ['name', 'otherName', 'birthday', 'province', 'district', 'ward', 'address', 'placeOfBirth', 'ethnic', 'placeOfJob', 'identityCard', 'relationshipWithOwner'].map(s => [s, s]));
    let params = this._collectParams(this.searchForm, map);
    console.log(params);
    this.http.get<any>('http://localhost:8080/people/params', {params: params}).subscribe((data) => {
      data.forEach((element: any) => {
        element.relationshipWithOwner = this.translateEnumToString(element.relationshipWithOwner)
      });
      this.people = new MatTableDataSource<People>(data);
      this.people.paginator = this.paginator;
      this.afterFilter = this.people.data;
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
      family_number: '',
      relationshipWithOwner: '',
      note: '',
    });
  }

  clearStartDate() {
    this.startDate = null;
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

  addEditPeople() {
    this.dialog.open(AddEditPeopleComponent,
      {
        width: '500px',
        // height: '1000px',
        disableClose: false,
        panelClass: 'app-add-edit-people',
        data:  null,
      })
      .afterClosed().subscribe(people => {
        this.peopleList.push(people.data);
        this.peopleList.forEach((element: any) => {
          element.relationshipWithOwner = this.translateEnumToString(element.relationshipWithOwner)
        });
        this.people.data = this.peopleList;
    });
  }

  onDelete(deleteId: number) {
    console.log(deleteId + "hihi");
    console.log(this.paginator.pageSize, this.paginator.pageIndex);
    // const deleteId = this.people[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index].id;
    console.log(deleteId);
    this.http.delete<any>(`http://localhost:8080/people/${deleteId}`).subscribe(
      () => this.http.get<any>('http://localhost:8080/people').subscribe((data) => {
        this.people.data = data;
      })
    );

  }

  openDialogDetails(id: number): void {
    console.log(id + "hihi");
    this.dialog.open(AddEditPeopleComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-people',
        data: this.peopleList.filter(people => people.id == id)[0],
        id: "-1"
      });
  }

  onEdit(id: number): void {
    this.dialog.open(AddEditPeopleComponent,
      {
        width: '500px',
        disableClose: false,
        panelClass: 'app-add-edit-people',
        data: this.peopleList.filter(people => people.id == id)[0],
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
    localStorage.removeItem('token');
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

  translateEnumToString (relation: string) {
    if (relation === 'OWNER')
      return RelationshipEnums.OWNER;
    else if (relation === 'WIFE')
      return RelationshipEnums.WIFE;
    else if (relation === 'SON')
      return RelationshipEnums.SON;
    else if (relation === 'DAUGHTER')
      return RelationshipEnums.DAUGHTER;
    else
      return '';
  }

}
