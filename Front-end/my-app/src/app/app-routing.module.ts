import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FormComponent } from './form/form.component';
import { FamilyRegisterComponent } from './family-register/family-register.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SearchComponent } from './search/search.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { CovidDataComponent } from './covid-data/covid-data.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {PeopleComponent} from "./people/people.component";
import {ChargeComponent} from "./charge/charge.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'about', component: AboutComponent},
  {path: 'family-register', component: FamilyRegisterComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'charge', component: ChargeComponent},
  {path: 'form', component: FormComponent},
  {path: 'reactiveform', component: ReactiveFormComponent},
  {path: 'search', component: SearchComponent},
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
