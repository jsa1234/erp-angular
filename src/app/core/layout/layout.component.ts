import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public translationService: TranslationService,) {
  }

  ngOnInit(): void {
  }
}
