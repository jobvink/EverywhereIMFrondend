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
  userId: number;
  colors = ['green', 'red', 'yellow', 'blue'];

  constructor(private http: HttpClient) {
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
    this.updateUsers();
  }

  updateUsers() {
    this.http.get('http://127.0.0.1:8000/api/users', {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .subscribe((data: UsersResponse) => {
        this.users = data;
        console.log(data);
      });
  }

  randomize() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.http.patch(`http://127.0.0.1:8000/api/users/${this.userId}/color`, {
      color: randomColor,
    }, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: (data) => {
        this.updateUsers();
      }
    });
  }

  userColors(user: any) {
    const colors = [];
    for (const color of user.colors) {
      colors.push(color.name);
    }
    return colors;
  }
}
