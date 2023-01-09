import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
    private toastr: ToastrService,
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
    this.http.post<any>('http://localhost:8080/user/login', dataLogin, {observe: 'response'}).subscribe(
      (data) => {
        if (data.status == 200) {
          window.sessionStorage.setItem('token', JSON.stringify(data.body.accessToken));
          this.toastr.success('Đăng nhập thành công');
          this.router.navigate(['family-register']);
        }
      },
      (err) => {
        if (err.status == 401){
          this.toastr.error('Đăng nhập thất bại');
          this.error = "Tài khoản hoặc mật khẩu không đúng";
          this.form.reset();
        }
      }
    )
  }

  isFocus() {
    this.error = '';
  }

}

export interface LOGIN_USER {
  username: String;
  password: String;
}


