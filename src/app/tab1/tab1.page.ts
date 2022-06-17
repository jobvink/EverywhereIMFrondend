import {Component, OnInit} from '@angular/core';
import {UsersResponse} from '../tab2/tab2-routing.module';
import {HttpClient} from '@angular/common/http';
import {ViewDidEnter} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, ViewDidEnter {
  colors: any;
  private userId: any;

  constructor(private http: HttpClient) {
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
  }

  ngOnInit(): void {
    this.updateColors();
  }

  ionViewDidEnter(): void {
    this.updateColors();
  }

  updateColors() {
    this.http.get(`http://127.0.0.1:8000/api/users/${this.userId}/color`, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe((data: UsersResponse) => {
        this.colors = data;
      });
  }

}
