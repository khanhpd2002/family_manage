import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    public router: Router,
    public http: HttpClient,
    public toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  error = '';
  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')),
    phone: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  submit() {
    const dataSingup: SIGNUP_USER = {
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    };
    this.http.post<any>('http://localhost:8080/user/sign-up', dataSingup).subscribe((data) => {
      if (data.status == 200) {
        this.toastr.success('Đăng kí thành công');
        this.router.navigate(['login']);
      }
      if (data.status == 404) {
        this.error = "Tài khoản đã tồn tại";
        this.toastr.error('Đăng kí thất bại');
        this.form.reset();
      }
    })
  }

}

export interface SIGNUP_USER {
  email: String;
  phone: String;
  username: String;
  password: String;
}


