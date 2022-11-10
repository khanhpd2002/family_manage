import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
  }
  error = '';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    const dataLogin : LOGIN_USER = {username: this.form.get('username')?.value, password: this.form.get('password')?.value};
    this.http.post<any>('http://localhost:8080/login', dataLogin).subscribe((data) => {
      if (data.status == 200) {
        this.router.navigate(['family-register']);
      }
      if (data.status == 404) {
        this.error = "Sai thong tin";
        this.form.reset();
      }
    })
  }

}

export interface LOGIN_USER {
  username : String;
  password : String;
}


