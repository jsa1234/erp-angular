import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { POSPrinter } from '@core/domain-classes/pos-printer.interface';
import { BaseComponent } from 'src/app/base.component';
import {v4 as uuid} from 'uuid'
import { PosPrinterService } from '../pos-printer.service';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-manage-pos-printer',
  templateUrl: './manage-pos-printer.component.html',
  styleUrls: ['./manage-pos-printer.component.scss']
})
export class ManagePosPrinterComponent extends BaseComponent implements OnInit {
  imgSrc:string | ArrayBuffer = null;
  posPrinterForm:FormGroup;
  loading$: Observable<boolean> = of(false);
  isUpdate: boolean = false;
  isImageUpdate: boolean = false;
  constructor(
    private fb:FormBuilder, 
    private posPrinterService:PosPrinterService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute

    ) {
    super();
  }

  ngOnInit(): void {
    this.getPOSPrinterDetails()
  }

  createForm():void{
    this.posPrinterForm = this.fb.group({
      posPrinterUUID:[uuid()],
      nameEnglish:   [''],
      ipAddress:     [''],
      portNo:        [''],
      paperWidth:    [''],
      modelName:     [''],
      serialNo:      [''],
      printSpeed:    [''],
      haveBattery:   [false],
      hasBluetooth:  [false],
      hasWifi:       [false],
      hasEthernet:   [false],
      hasUSB:        [false],
      imagePath:     [''],
      printerImage:  ['']
    })
  }


  save():void{
    if(this.posPrinterForm.invalid){
      this.posPrinterForm.markAllAsTouched();
      return;
    }

    const posPrinter:POSPrinter = this.posPrinterForm.getRawValue();
    if(this.isImageUpdate){
      posPrinter.printerImage = this.imgSrc || '';
      posPrinter.isImageUpdate = true;
    }
    this.isUpdate?this.updatePosPrinter(posPrinter):this.createPosPrinter(posPrinter)
  }

  createPosPrinter(posPrinter:POSPrinter):void{
    this.loading$ = of(true)
    this.sub$.sink = this.posPrinterService.createPosPrinter(posPrinter).subscribe(
      ()=>{
        this.toastr.success('POS Printer Created Successfully');
        this.router.navigate(['/pos-printer']);
        this.loading$ = of(true)

      },
      ()=>{
        this.toastr.error('POS Printer Created Failed');
        this.loading$ = of(true)
      })
  }
  updatePosPrinter(posPrinter:POSPrinter):void{
    this.loading$ = of(true)
    this.sub$.sink = this.posPrinterService.updatePosPrinter(posPrinter).subscribe(
      ()=>{
        this.toastr.success('POS Printer Updated Successfully');
        this.router.navigate(['/pos-printer']);
        this.loading$ = of(true)

      },
      ()=>{
        this.toastr.error('POS Printer Updated Failed');
        this.loading$ = of(true)
      })
  }


  getPOSPrinterDetails(): void {
    this.route.data.subscribe((data: { posPrinter: POSPrinter }) => {
      this.createForm();
      if (!data.posPrinter) {
        this.isUpdate = false;
        return;
      }
      this.isUpdate = true;
      const posPrinter = data.posPrinter
      this.posPrinterForm.patchValue(posPrinter);
      this.imgSrc = posPrinter.imagePath?(environment.apiUrl+posPrinter.imagePath) : null
    });
  }

  onFileSelect($event:Event) {
    const fileInput = $event.target as HTMLInputElement;
    const fileSelected = fileInput.files[0];
    if (!fileSelected) {
      return;
    }

    const mimeType = fileSelected.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileSelected);
    reader.onload = (_event) => {
      this.imgSrc = reader.result;
      this.isImageUpdate = true;
      fileInput.value = null;
    };
  }

  onRemoveImage() {
    this.isImageUpdate = true;
    this.imgSrc = null;
  }
}
