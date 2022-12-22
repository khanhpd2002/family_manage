import {Component, OnInit} from '@angular/core';
import {ServerHttpService} from '../Services/server-http.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private serverHttp: ServerHttpService
  ) {
  }

  ngOnInit(): void {
    this.serverHttp.getProfile().subscribe((data) => {
      console.log(data);
    });
  }

}
