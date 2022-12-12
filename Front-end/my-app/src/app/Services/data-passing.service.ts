import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataPassingService {
  public data: any[] = [];
  public tempData: any = {};
  public tempIndex: any;

  addData(data: any) {
    this.data.push(data);
  }

  getIndex(index: number) {
    this.tempIndex = index;
  }

  constructor() {
  }
}
