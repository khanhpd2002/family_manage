import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditChargeComponent} from "./add-edit-charge/add-edit-charge.component";
import {Charge} from "../models/charge.models";
import {ToastrService} from "ngx-toastr";
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import {People} from "../models/people.model";

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
    chargeList : Charge[];
    charge : any;
    nameValues: String[] = [];
    amountValues: Int16Array[] = [];
    charge_typeValues = ['Bắt buộc', 'Tự nguyện'];
    searchForm: FormGroup = new FormGroup({});
    isShowing: boolean = false;
    isEdit: boolean = false;

    // people: any;
    afterFilter: any;
    displayedColumns: string[] = ['name', 'amount', 'charge_type', ' '];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    @ViewChild('matRef') matRef: MatSelect;

    constructor(
      private activatedRoute: ActivatedRoute,
      public routes: Router,
      public http: HttpClient,
      protected formBuilder: FormBuilder,
      private dialog: MatDialog,
      public toastr: ToastrService) {
      this.searchForm = this.formBuilder.group({
        name: [''],
        amount: [''],
        charge_type: ['']
      });
    }

    ngOnInit(): void {
      this.onSearch();
      // this.activatedRoute.data.subscribe(({charge}) => {
      //   this.chargeList = charge;
      //   // console.log(JSON.stringify(charge));
      //   this.charge = new MatTableDataSource<Charge>();
      //   this.charge.data = charge;
      //   this.charge.paginator = this.paginator;
      //   this.afterFilter = this.charge.data;
      // });
    }

    openMenu() {
      this.trigger.openMenu();
    }

    onSearch() {
      const map = Object.fromEntries(
        ['name', 'amount', 'charge_type'].map(s => [s, s]));
      let params = this._collectParams(this.searchForm, map);
      console.log(params);
      this.http.get<any>('http://localhost:8080/charge/params', {params: params}).subscribe((data) => {
        this.charge = new MatTableDataSource<Charge>(data);
        this.charge.paginator = this.paginator;
        this.afterFilter = this.charge.data;
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
        amount: '',
        // charge_type: null,
      });
      this.matRef.options.forEach((data: MatOption) => data.deselect());
    }

    addEditCharge() {
      this.dialog.open(AddEditChargeComponent,
        {
          width: '500px',
          height: '1000px',
          disableClose: false,
          panelClass: 'app-add-edit-charge',
          data: null,
        })
        .afterClosed().subscribe(charge => {
          this.chargeList.push(charge.data);
          this.charge.data = this.chargeList;
        })
    }

    onDelete(id: Int16Array) {
      // console.log(this.paginator.pageSize, this.paginator.pageIndex);
      // const deleteId = this.charge[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index].id;
      // console.log(deleteId);
      this.http.delete<any>(`http://localhost:8080/charge/${id}`).subscribe(
        {
          complete: () => {
            this.chargeList = this.chargeList.filter(charge => {
              if (charge.id == id) return false;
              return true;
            })
            this.charge.data = this.chargeList;

          }
        })
    }

    onEdit(charge: Charge): void {
      // this.isEdit = !this.isEdit;
      this.dialog.open(AddEditChargeComponent,
        {
          width: '500px',
          disableClose: false,
          panelClass: 'app-add-edit-charge',
          data: charge,
        }).afterClosed().subscribe(charge => {
          this.chargeList = this.chargeList.map(chargeE => chargeE.id !== charge.data.id as Int16Array ? chargeE : charge.data);
          this.charge.data = this.chargeList;
        })
    }

    goList(id: any) {
      this.routes.navigate([`charge/${id}`]);
    }

    // toggleSidenav() {
    //   this.isShowing = !this.isShowing;
    // }
  }


