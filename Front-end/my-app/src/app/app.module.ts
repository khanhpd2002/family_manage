import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ToastrModule} from "ngx-toastr";
import { MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
// import { MenuModule } from '@syncfusion/ej2-angular-navigations';

import {AppComponent} from './app.component';
import {FamilyRegisterComponent} from './family-register/family-register.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AddEditFamilyRegisterComponent} from "./family-register/add-edit-family-register/add-edit-family-register.component";
import {PeopleComponent} from './people/people.component';
import {ChargeComponent} from './charge/charge.component';
import {AddEditPeopleComponent} from "./people/add-edit-people/add-edit-people.component";
import {AddEditChargeComponent} from "./charge/add-edit-charge/add-edit-charge.component";
import { AddEditCharge_manageComponent } from './charge-detail/add-edit-charge_manage/add-edit-charge_manage';
import {Interceptor} from "./_helpers/interceptor";
import { ChargeDetailComponent } from './charge-detail/charge-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    FamilyRegisterComponent,
    LoginComponent,
    SignUpComponent,
    AddEditFamilyRegisterComponent,
    PeopleComponent,
    ChargeComponent,
    AddEditPeopleComponent,
    AddEditChargeComponent,
    AddEditCharge_manageComponent,
    ChargeDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatCardModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
