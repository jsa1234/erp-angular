import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POSPrinter } from '@core/domain-classes/pos-printer.interface';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-pos-printer-detail',
  templateUrl: './pos-printer-detail.component.html',
  styleUrls: ['./pos-printer-detail.component.scss']
})
export class PosPrinterDetailComponent implements OnInit {
  imagePath$: Observable<string> ;
  posPrinter: POSPrinter;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getPOSPrinterDetails()
  }

  getPOSPrinterDetails(): void {
    this.route.data.subscribe((data: { posPrinter: POSPrinter }) => {
      if (!data.posPrinter) {
        return;
      }
      this.posPrinter = data.posPrinter
      this.imagePath$ = this.posPrinter.imagePath? of(`${environment.apiUrl}${this.posPrinter.imagePath}`) : of(environment.dummyImage)
    });
  }
}
