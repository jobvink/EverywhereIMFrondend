import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {RegisterResponse} from './registration.module';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    password_confirmation: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.http
      .post('http://127.0.0.1:8000/api/register', this.contactForm.value, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json'
        }
      })
      .subscribe({
          next: (data: RegisterResponse) => {
            if (data.status === 'success') {
              this.router.navigate(['/app/color']);
            }
          },
          error: error => {
            console.error('There was an error!', error);
          }
        }
      );
  }

}
