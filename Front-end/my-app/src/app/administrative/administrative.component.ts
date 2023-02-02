import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {People} from "../models/people.model";
import {FamilyRegister} from "../models/family-register.models";
import {RelationshipEnums} from "../models/relationship.enums";
import {ToastrService} from "ngx-toastr";
import {AdministrativeModels} from "../models/administrative.models";

@Component({
  selector: 'app-administrative',
  templateUrl: './administrative.component.html',
  styleUrls: ['./administrative.component.scss']
})
export class AdministrativeComponent implements OnInit {

  administrative: any;
  afterFilter: any;
  listAdministrative: AdministrativeModels[];
  searchForm: FormGroup = new FormGroup({});

  displayedColumns: string[] = ['peopleId', 'registerPhone', 'type', 'from', 'to', 'reason', ' '];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    public routes: Router,
    public http: HttpClient,
    protected formBuilder: FormBuilder,
    private dialog: MatDialog,
    public toastr: ToastrService) {
    this.searchForm = this.formBuilder.group({
      peopleId: [''],
      registerPhone: [''],
      from: [''],
      to: [''],
      reason: [''],
    });
  }

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/administrative').subscribe((administrative) => {
      administrative.forEach((e: any) => {
        e.type = this.translateEnumToString(e.type);
      })
      this.listAdministrative = administrative;
      this.administrative = new MatTableDataSource<AdministrativeModels>();
      this.administrative.data = this.listAdministrative;
      this.administrative.paginator = this.paginator;
      this.afterFilter = this.administrative.data;
    });
  }

  onSearch() {

  }

  onResetForm() {

  }

  goList(id: number) {

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
    else if (relation === 'PERMANENT')
      return 'Thường trú';
    else if (relation === 'TEMPORARY')
      return 'Tạm trú';
    else if (relation === 'ABSENT')
      return 'Tạm vắng';
    else if (relation === 'DIED')
      return 'Đã mất';
    else
      return '';
  }
}
