import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsersResponse} from './tab2-routing.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  users: any;

  constructor(private http: HttpClient) {
    this.http.get('http://127.0.0.1:8000/api/users', {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .subscribe((data: UsersResponse) => this.users = data);
  }

  randomize() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    this.http.patch('http://127.0.0.1:8000/api/users/1/color', {
      color: randomColor,
    }).subscribe({
      next: (data) => {
        console.log(data);
      }
    });
  }

}
