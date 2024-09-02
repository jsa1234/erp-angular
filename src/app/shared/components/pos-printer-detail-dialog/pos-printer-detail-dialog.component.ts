import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { POSPrinter } from '@core/domain-classes/pos-printer.interface';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { PosPrinterService } from 'src/app/accounts/pos-printer/pos-printer.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-pos-printer-detail-dialog',
  templateUrl: './pos-printer-detail-dialog.component.html',
  styleUrls: ['./pos-printer-detail-dialog.component.scss']
})
export class PosPrinterDetailDialogComponent extends BaseComponent implements OnInit {
  imagePath$: Observable<string> = of(environment.dummyImage);
  isLoading$: Observable<boolean> = of(false);
  posPrinter: POSPrinter;
  constructor(private posPrinterService:PosPrinterService,
    public dialogRef: MatDialogRef<PosPrinterDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,) {
    super();
  }

  ngOnInit(): void {
    this.getPOSDeviceDetails()
  }
  onCancel(posPrinter: POSPrinter): void {
    this.dialogRef.close(posPrinter);
  }
  getPOSDeviceDetails(): void {
    this.isLoading$ = of(true);
    this.sub$.sink = this.posPrinterService.getSinglePosPrinter(this.data).subscribe((posPrinter:POSPrinter)=>{
      this.posPrinter = posPrinter
      this.imagePath$ =this.posPrinter.imagePath?of(environment.apiUrl+this.posPrinter.imagePath): of(environment.dummyImage);
      this.isLoading$ = of(false);
    },
    ()=> this.isLoading$ = of(false))
  }

}
