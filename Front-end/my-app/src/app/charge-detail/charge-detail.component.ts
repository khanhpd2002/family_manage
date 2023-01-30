import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
// import {AddEditFamilyComponent} from "./add-edit-family/add-edit-family.component";
import {Charge} from "../models/charge.models";
import {ToastrService} from "ngx-toastr";
import { MatMenuTrigger } from '@angular/material/menu';
import { Location } from '@angular/common';
// import { FamilyRegister } from 'src/app/models/family-register.models';
import { AddEditCharge_manageComponent } from './add-edit-charge_manage/add-edit-charge_manage';
import { Charge_manage } from '../models/charge_manage.model';
import { faSterlingSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-charge-detail',
  templateUrl: './charge-detail.component.html',
  styleUrls: ['./charge-detail.component.css']
})
export class ChargeDetailComponent implements OnInit {

  family : any;
  families : any;
  familyList: Charge_manage[];
    nameValues: String[] = [];
    amountValues: Int16Array[] = [];
    searchForm: FormGroup = new FormGroup({});
    isShowing: boolean = false;
    isEdit: boolean = false;
    charge_id: any;
    // people: any;
    afterFilter: any;
    displayedColumns: string[] = ['number', 'amount', 'payer', 'pay_date', ' '];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    constructor(
      private route: ActivatedRoute,
      // private activatedRoute: ActivatedRoute,
      public routes: Router,
      public http: HttpClient,
      protected formBuilder: FormBuilder,
      private dialog: MatDialog) {
    }

    ngOnInit(): void {
      this.charge_id = this.route.snapshot.paramMap.get('id');
      console.log(this.charge_id);
      var url = 'http://localhost:8080/charge_manage/charge/' + String(this.charge_id);
      // console.log(id);
      this.http.get<any>(url).subscribe(
        {
          next: (families) => {
            this.familyList = families;
            // this.families = families;
            console.log(families);
            this.family = new MatTableDataSource<Charge_manage>();
            this.family.data = families;
            this.family.paginator = this.paginator;
            ;
            this.afterFilter = this.family.data;
        }
      });
    }

    // onSearch() {
    //   const formValue = `${this.searchForm.get('name')?.value}${this.searchForm.get('amount')?.value}${this.searchForm.get('charge_type')?.value}`;
    //   this.charge.filter = formValue.trim().toLowerCase();
    //   this.afterFilter = this.charge.filteredData;
    //   console.log(this.afterFilter);
    // }

    // onResetForm() {
    //   this.searchForm.patchValue({
    //     name: '',
    //     amount: '',
    //     charge_type: null,
    //   });
    // }

    addEditCharge() {
      this.dialog.open(AddEditCharge_manageComponent,
        {
          width: '500px',
          height: '1000px',
          disableClose: false,
          panelClass: 'app-add-edit-charge_manage',
          data: {charge_id:this.charge_id},
        })
        .afterClosed().subscribe((charge_manage) => {
        // this.http.get<any>(`http://localhost:8080/charge/${this.charge_id}`).subscribe((data) => {
        //   this.families = new MatTableDataSource<Charge>(data);
        //   this.families.paginator = this.paginator;
        // })
        console.log(charge_manage.data);
        this.familyList.push(charge_manage.data);
        this.family.data = this.familyList;
      });
    }

    onDelete(charge_id: Int16Array, family_number: Int16Array) {
      // console.log(id);
      console.log(`http://localhost:8080/charge_manage?charge_id=${charge_id}&family_number=${family_number}`);
      // const deleteId = this.charge[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index].id;
      // console.log(deleteId);
      this.http.delete<any>(`http://localhost:8080/charge_manage/params?charge_id=${charge_id}&family_number=${family_number}`).subscribe(
        {
          complete: () => {
            this.familyList = this.familyList.filter(
              charge_manage => {
                if (charge_manage.family_number == family_number) return false
                return true;
              }
            )
            console.log(this.familyList);
            this.family.data = this.familyList;
          }
        })
    }

    onEdit(family: Charge_manage): void {
      // this.isEdit = true;
      this.dialog.open(AddEditCharge_manageComponent,
        {
          width: '500px',
          disableClose: false,
          panelClass: 'app-add-edit-charge',
          data: family,
        }).afterClosed().subscribe(charge_manage => {
          console.log("hihi"+JSON.stringify(charge_manage.data));
          this.familyList = this.familyList.map(charge_manageE => charge_manageE.family_number !== charge_manage.data.family_number as Int16Array ? charge_manageE : charge_manage.data);
          console.log(this.familyList);
          this.family.data = this.familyList;

      });
    }

    toggleSidenav() {
      this.isShowing = !this.isShowing;
    }


}
