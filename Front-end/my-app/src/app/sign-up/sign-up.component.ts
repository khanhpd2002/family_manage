import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    public router: Router,
    public http: HttpClient,
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

  submit() {
    const dataSingup: SIGNUP_USER = {
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    };
    this.http.post<any>('http://localhost:8080/user/sign-up', dataSingup).subscribe((data) => {
      if (data.status == 200) {
        this.router.navigate(['login']);
      }
      if (data.status == 404) {
        this.error = "Sai thong tin";
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


