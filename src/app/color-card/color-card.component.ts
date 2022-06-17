import {Component, Input, OnInit} from '@angular/core';

class Color {
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  hex_code: string;
}

@Component({
  selector: 'app-color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.scss'],
})
export class ColorCardComponent implements OnInit {
  @Input()
  color: Color;

  constructor() {
  }

  ngOnInit() {
  }

}
