import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Route, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router,
    public http: HttpClient,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  error = '';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    const dataLogin: LOGIN_USER = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    };
    this.http.post<any>('http://localhost:8080/login', dataLogin).subscribe((data) => {
      if (data.status == 200) {
        this.toastr.success('Login success');
        this.router.navigate(['family-register']);
      }
      if (data.status == 404) {
        this.toastr.error('Login fail');
        this.error = "Sai thong tin";
        this.form.reset();
      }
    })
  }

}

export interface LOGIN_USER {
  username: String;
  password: String;
}


