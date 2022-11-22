import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


import { AppComponent } from './app.component';
import { FamilyRegisterComponent } from './family-register/family-register.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AboutComponent } from './about/about.component';
import { FilterPipe } from './filter.pipe';
import { SearchComponent } from './search/search.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { CovidDataComponent } from './covid-data/covid-data.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddEditFamilyRegisterComponent } from "./family-register/add-edit-family-register/add-edit-family-register.component";
import { PeopleComponent } from './people/people.component';
import { ChargeComponent } from './charge/charge.component';
import { AddEditPeopleComponent } from "./people/add-edit-people/add-edit-people.component";

@NgModule({
  declarations: [
    AppComponent,
    FamilyRegisterComponent,
    FormComponent,
    ReactiveFormComponent,
    AboutComponent,
    FilterPipe,
    SearchComponent,
    FlexLayoutComponent,
    CovidDataComponent,
    LoginComponent,
    SignUpComponent,
    AddEditFamilyRegisterComponent,
    PeopleComponent,
    ChargeComponent,
    AddEditPeopleComponent,
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
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatCardModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
