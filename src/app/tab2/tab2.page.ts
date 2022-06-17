import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsersResponse} from './tab2-routing.module';
import {ColorService} from '../color.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  users: any;
  userId: number;
  colors = ['green', 'red', 'yellow', 'blue'];

  constructor(private http: HttpClient, private colorService: ColorService, private userService: UserService) {
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
    this.updateUsers();
  }

  updateUsers() {

    this.userService
      .getUsers()
      .subscribe((data: UsersResponse) => {
        this.users = data;
      });
  }

  randomize() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.colorService.updateColor(randomColor, this.userId)
      .subscribe({
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
