import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditChargeComponent} from "./add-edit-charge/add-edit-charge.component";
import {Charge} from "../models/charge.models";
@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
    charge : any;
    nameValues: String[] = [];
    amountValues: Int16Array[] = [];
    charge_typeValues = ['Voluntary', 'Mandatory'];
    searchForm: FormGroup = new FormGroup({});
    isShowing: boolean;
    isEdit: boolean;

    // people: any;
    afterFilter: any;
    displayedColumns: string[] = ['name', 'amount', 'charge_type'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
      private activatedRoute: ActivatedRoute,
      public routes: Router,
      public http: HttpClient,
      protected formBuilder: FormBuilder,
      private dialog: MatDialog) {
      this.searchForm = this.formBuilder.group({
        name: [''],
        amount: [''],
        charge_type: [' ']
      });
    }

    ngOnInit(): void {

      this.activatedRoute.data.subscribe(({charge}) => {
        console.log(JSON.stringify(charge));
        this.charge = new MatTableDataSource<Charge>(charge);
        this.charge.paginator = this.paginator;
        this.afterFilter = this.charge.data;
      });
    }

    onSearch() {
      const formValue = `${this.searchForm.get('name')?.value}${this.searchForm.get('amount')?.value}${this.searchForm.get('charge_type')?.value}`;
      this.charge.filter = formValue.trim().toLowerCase();
      this.afterFilter = this.charge.filteredData;
      console.log(this.afterFilter);
    }

    onResetForm() {
      this.searchForm.patchValue({
        name: '',
        amount: '',
        charge_type: '',
      });
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
        .afterClosed().subscribe(result => {
        this.http.get<any>('http://localhost:8080/charge').subscribe((data) => {
          this.charge = new MatTableDataSource<Charge>(data);
          this.charge.paginator = this.paginator;
        })
      });
    }

    onDelete(index: number) {
      console.log(index);
      console.log(this.paginator.pageSize, this.paginator.pageIndex);
      const deleteId = this.charge[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index].id;
      console.log(deleteId);
      this.http.delete<any>(`http://localhost:8080/charge/${deleteId}`).subscribe();
      this.http.get<any>('http://localhost:8080/charge').subscribe((data) => {
        this.charge = new MatTableDataSource<Charge>(data);
        this.charge.paginator = this.paginator;
      })
    }

    openDialogDetails(index: number): void {
      this.dialog.open(AddEditChargeComponent,
        {
          width: '500px',
          disableClose: false,
          panelClass: 'app-add-edit-people',
          data: this.afterFilter[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index],
          id: "-1"
        });
    }

    onEdit(index: number): void {
      this.dialog.open(AddEditChargeComponent,
        {
          width: '500px',
          disableClose: false,
          panelClass: 'app-add-edit-charge',
          data: this.afterFilter[(this.paginator?.pageSize ?? 0) * (this.paginator?.pageIndex ?? 0) + index],
        }).afterClosed().subscribe(result => {
        this.http.get<any>('http://localhost:8080/charge').subscribe((data) => {
          this.charge = new MatTableDataSource<Charge>(data);
          this.charge.paginator = this.paginator;
        })
      });
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

  }



