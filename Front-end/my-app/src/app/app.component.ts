import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public router: Router
  ) {
  }
  isShowing = false;

  title = 'my-app';

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  goLogout() {
    window.sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  goFamilyRegisters() {
    this.router.navigate(['family-register']);
  }

  goPeople() {
    this.router.navigate(['people']);
  }

  goCharge() {
    this.router.navigate(['charge']);
  }
}
