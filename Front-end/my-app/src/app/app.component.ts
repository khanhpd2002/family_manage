import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (
    public router: Router
  ){

  }
  title = 'my-app';
  goHome() {
    this.router.navigate(['home']);
  }

  goAbout() {
    this.router.navigate(['about']);
  }

  goForm() {
    this.router.navigate(['reactiveform']);
  }
  
  goTable() {
    this.router.navigate(['table']);
  }

  goSearch() {
    this.router.navigate(['search']);
  }

  goFlexLayout() {
    this.router.navigate(['flex-layout']);
  }

  goCovidData() {
    this.router.navigate(['coviddata']);
  }

}
