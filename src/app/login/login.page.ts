import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {TokenResponse} from './login.module';
import {UserService} from '../user.service';

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
  public error: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {

    this.userService
      .loginUser({
        ...this.loginForm.value,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        device_name: (navigator as any).userAgent
      }).subscribe((data: TokenResponse) => {

      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('token', data.token);

      this.router.navigate(['/app/color']);
    }, (err: HttpErrorResponse) => {
      this.error = err.error.message;
    });
  }

}
