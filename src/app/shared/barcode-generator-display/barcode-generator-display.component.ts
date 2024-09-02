import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IVariantBarcodeImages } from '@core/domain-classes/barcode-profile-configurations.interface';
import { ProductPrice } from '@core/domain-classes/product';

@Component({
  selector: 'app-barcode-generator-display',
  templateUrl: './barcode-generator-display.component.html',
  styleUrls: ['./barcode-generator-display.component.scss']
})
export class BarcodeGeneratorDisplayComponent implements OnChanges {
@Input() productVariantsPdf:ProductPrice[];
productVariants:ProductPrice[];
@Input() variantBarcodeImagesPdf:IVariantBarcodeImages;
variantBarcodeImages:IVariantBarcodeImages;
  constructor() { }

ngOnChanges(changes: SimpleChanges): void {
  if(changes['productVariantsPdf']&&changes['variantBarcodeImagesPdf']){
    this.variantBarcodeImages = this.variantBarcodeImagesPdf;
    this.productVariants = this.productVariantsPdf;
    this.variantBarcodeImagesPdf = null;
    this.productVariants = null;
  }
}
isConfigEnabledPrint(lable:string,variantName:string):boolean{
  if(this.variantBarcodeImagesPdf[variantName].configuration){
    const config =this.variantBarcodeImagesPdf[variantName].configuration.configurations.find(c=>c.key.toLocaleLowerCase() === lable.toLocaleLowerCase())
    return config ? config.value : false;
  }
  return false;
}


clear():void{
  for (const variantName of Object.keys(this.variantBarcodeImagesPdf)) {
    this.variantBarcodeImagesPdf[variantName].images = [];
  }
  this.productVariantsPdf = []
  this.variantBarcodeImagesPdf = {}
}

deleteBarcodeImage(variantName: string, rowIndex: number, columnIndex: number): void {
  if (this.variantBarcodeImagesPdf[variantName]) {
    const images = this.variantBarcodeImagesPdf[variantName].images;
    if (images && images[rowIndex] && images[rowIndex][columnIndex]) {
      // Delete the selected barcode image
      images[rowIndex].splice(columnIndex, 1);
      
      // Check if the images array is empty
      if (images.every(row => row.length === 0)) {
        // Remove the variant from variantBarcodeImagesPdf
        delete this.variantBarcodeImagesPdf[variantName];
      }
    }
  }

}

isVariantBarcodeImagesPdfEmpty(): boolean {
  if (this.variantBarcodeImagesPdf) {
    return Object.keys(this.variantBarcodeImagesPdf).length === 0;
  }
  return true;
}

printBarcode():void{
  setTimeout(() => {
    let name = 'Barcode Images'
    let printContents, popupWin;
    printContents = document.getElementById('barcode').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title>${name}</title>
            <style>
            @page { size: auto;  margin: 0mm;  margin-top:60px; }
    
            @media print {
              * {
                font-family: "Hind-Vadodara", sans-serif;
                -webkit-print-color-adjust: exact;
              }
            }
            tr{
              border: 1px solid #000;
              border-spacing: 2px;
            }
            table {
              border-collapse: collapse;
            }
            th, td {
              padding: 5px;
            }
            </style>
            <script>
            function loadHandler(){
    
            var is_chrome = function () { return Boolean(window.chrome); }
        if(is_chrome)
        {
           window.print();
           setTimeout(function(){window.close();}, 1000);
           //give them 10 seconds to print, then close
        }
        else
        {
           window.print();
           window.close();
        }
        }
        </script>
          </head>
      <body onload="loadHandler()">${printContents}</body>
        </html>
    `
    );
    popupWin.document.close();
  }, 1000);
  }

}
