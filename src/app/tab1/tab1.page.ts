import {Component, OnInit} from '@angular/core';
import {UsersResponse} from '../tab2/tab2-routing.module';
import {ViewDidEnter} from '@ionic/angular';
import {ColorService} from "../color.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, ViewDidEnter {
  colors: any;
  private userId: any;

  constructor(private colorService: ColorService) {
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
  }

  ngOnInit(): void {
    this.updateColors();
  }

  ionViewDidEnter(): void {
    this.updateColors();
  }

  updateColors() {
    this.colorService
      .getUserColors(this.userId)
      .subscribe((data: UsersResponse) => {
        this.colors = data;
      });
  }

}
