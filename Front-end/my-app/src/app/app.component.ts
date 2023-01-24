import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    // private activatedRoute: ActivatedRoute,
    public routes: Router,
  ) {
  }
  isShowing: boolean;
  title = 'my-app';
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
