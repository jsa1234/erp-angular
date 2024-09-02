import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss']
})
export class DigitalClockComponent extends BaseComponent implements OnInit {
  date: Date;

  constructor() { super()}

  ngOnInit(): void {
    this.sub$.sink =  interval(1000).subscribe(() => {
      this.date = new Date();
    })
  }

}
