import {Component, OnInit} from '@angular/core';
import {ServerHttpService} from '../Services/server-http.service';

@Component({
  selector: 'app-covid-data',
  templateUrl: './covid-data.component.html',
  styleUrls: ['./covid-data.component.css']
})
export class CovidDataComponent implements OnInit {
  title = 'Covid 19';
  globalData = [];
  countries = [];

  constructor(private serverHttp: ServerHttpService) {
  }

  ngOnInit(): void {
    this.serverHttp.getSummary().subscribe((data) => {
      this.globalData = data.Global;
      this.countries = data.Countries;
      console.log(this.countries);
    })
  }

}
