import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('This is success');
  }

}
