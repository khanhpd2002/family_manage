import {Component, OnInit} from '@angular/core';
import {DataPassingService} from '../Services/data-passing.service';

interface Info {
  address: any;
  name: any;
  phone: any;
  email: any;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(public dataPassing: DataPassingService) {
    // this.data = dataPassing.data;
  }

  // searchTerm = '';
  // data: Info[] = [];
  // allData: Info[] = [];
  // term = '';

  // search(value: string): void {
  //   this.data = this.allData.filter((val : any) =>
  //     val.name.toLowerCase().includes(value)
  //   );
  // }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataPassing.data.filter = filterValue.trim().toLowerCase();
  }

}
