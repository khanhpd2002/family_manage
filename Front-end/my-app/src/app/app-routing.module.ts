import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, PreloadAllModules, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {FamilyRegisterComponent} from './family-register/family-register.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PeopleComponent} from "./people/people.component";
import {ChargeComponent} from "./charge/charge.component";
import { ChargeDetailComponent } from './charge-detail/charge-detail.component';
import { FamilyRegister } from './models/family-register.models';
import { FamilyResolver } from './_resolve/FamilyResolver';
import { PeopleResolver } from './_resolve/PeopleResolver';
import { ChargeResolver } from './_resolve/ChargeResolver';
import { FamilyMemberComponent } from './family-register/family-member/family-member.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {
    path: 'family-register',
    component: FamilyRegisterComponent,
    resolve: {
      family: FamilyResolver
    }
  },
  {
    path: 'people',
    component: PeopleComponent,
    resolve: {
      people: PeopleResolver
    }
  },
  {
    path: 'charge',
    component: ChargeComponent,
    resolve: {
      charge: ChargeResolver,
    }
  },
  {
    path: 'family-register/:number',
    component: FamilyMemberComponent
  },
  {
    path: 'charge/:id',
    component: ChargeDetailComponent
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules
    },
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
