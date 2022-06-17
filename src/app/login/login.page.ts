import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {TokenResponse} from './login.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.http.post('http://127.0.0.1:8000/api/token', {
      ...this.loginForm.value,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      device_name: (navigator as any).userAgent
    })
      .subscribe((data: TokenResponse) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/app/color']);
      }, error => console.log(error));
  }

}
