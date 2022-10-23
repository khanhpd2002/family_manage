import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SearchComponent } from './search/search.component';
import { TableComponent, EditTableComponent } from './table/table.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { CovidDataComponent } from './covid-data/covid-data.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'form', component: FormComponent},
  {path: 'table', component: TableComponent},
  {path: 'reactiveform', component: ReactiveFormComponent},
  {path: 'search', component: SearchComponent},
  {path: 'table-edit', component: EditTableComponent},
  {path: 'table-edit/:id', component: EditTableComponent},
  {path: 'flex-layout', component: FlexLayoutComponent},
  {path: 'coviddata', component: CovidDataComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
