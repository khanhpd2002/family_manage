import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FamilyRegisterComponent} from './family-register/family-register.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PeopleComponent} from "./people/people.component";
import {ChargeComponent} from "./charge/charge.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'family-register', component: FamilyRegisterComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'charge', component: ChargeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
