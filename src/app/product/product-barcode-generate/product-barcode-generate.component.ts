import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBarcodeProfileConfigurations, IConfiguration, IVariantBarcodeImages } from '@core/domain-classes/barcode-profile-configurations.interface';
import { IBarcodeProfile } from '@core/domain-classes/barcode-profile.interface';
import { IBranch } from '@core/domain-classes/branch';
import { ICompany } from '@core/domain-classes/company';
import { IProduct, ProductPrice } from '@core/domain-classes/product';
import { CompanyOrBranch } from '@core/domain-classes/types/company-or-branch.type';
import { SecurityService } from '@core/security/security.service';
import { ClonerService } from '@core/services/clone.service';
import { GenerateBarcode, UpdateBarcodeConfigurations } from '@shared/helpers/barcode-generator.helper';
import { map, mergeMap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-product-barcode-generate',
  templateUrl: './product-barcode-generate.component.html',
  styleUrls: ['./product-barcode-generate.component.css'],
})
export class ProductBarcodeGenerateComponent extends BaseComponent implements OnInit {
  productVariants: ProductPrice[] = [];
  barcodeProfiles: IBarcodeProfile[] = [];
  barcodeProfileConfigurations: IBarcodeProfileConfigurations[] = [];
  selectedProductVariant: ProductPrice;
  quantity = 1;
  isShowConfiguration = false;
  selectedProfile: IBarcodeProfile;
  selectedProfileConfiguration: IBarcodeProfileConfigurations;
  variantBarcodeImages: IVariantBarcodeImages = {};
  variantBarcodeImagesPdf: IVariantBarcodeImages = {};
  productVariantsPdf: ProductPrice[] = [];
  stickerPerLine: number = null;
  product: IProduct;
  allBranches: CompanyOrBranch[]
  selectedBranch:CompanyOrBranch;
  mfgDate:Date
  expDate:Date
  constructor(
    private route: ActivatedRoute, 
    private clonerService: ClonerService, 
    private branchService:BranchService, 
    private securityService:SecurityService) {
    super();
  }

  ngOnInit() {
    this.fetchBarcodeAndVariants();
    this.getBranchOrCompany()
  }

  fetchBarcodeAndVariants(): void {
    this.sub$.sink = this.route.data.subscribe((data: {
      barcode: {
        barcodeProfiles: IBarcodeProfile[];
        product: IProduct;
        barcodeProfileConfigurations: IBarcodeProfileConfigurations[];
      };
    }) => {
      const { barcode } = data;
      this.barcodeProfiles = barcode.barcodeProfiles || [];
      this.product = barcode.product || null
      this.productVariants = barcode.product.productPrices || [];
      this.barcodeProfileConfigurations = barcode.barcodeProfileConfigurations || [];
    });
  }

  getSingleProfileConfiguration(): void {
    if (!this.selectedProfile || !this.selectedProductVariant) {
      console.log('Please choose both profile and variant');
      return;
    }

    this.isShowConfiguration = true;
    this.variantBarcodeImages = {};
    this.selectedProfileConfiguration = this.clonerService.deepClone<IBarcodeProfileConfigurations>(
      this.barcodeProfileConfigurations.find((p) => p.profileId === this.selectedProfile.barcodeProfileEnum)
    );
    this.variantBarcodeImages = GenerateBarcode(
      this.selectedProfile,
      this.selectedProfileConfiguration,
      this.selectedProductVariant,
      this.selectedProfile.stickerPerLine,
      this.selectedBranch,
      this.product.nameEnglish,
      this.mfgDate,
      this.expDate
    );

    console.log('');
  }

  updateConfigurationValue(config: IConfiguration): void {
    const oppositeKey = {
      sellingPrice: 'wholesaleRate',
      wholesaleRate: 'sellingPrice',
    }[config.key];
  
    if (config.value !== undefined && oppositeKey) {
      this.selectedProfileConfiguration.configurations = this.selectedProfileConfiguration.configurations.map(x => {
        if (x.key === oppositeKey) {
          return { ...x, value: !config.value }; // Spread existing properties and update value
        }
        return x; // Leave unaffected configurations unchanged
      });
    }
  }
  
  
  

  isConfigEnabled(label: string): boolean {
    if (this.selectedProfileConfiguration) {
      const config = this.selectedProfileConfiguration.configurations.find(
        (c) => c.key.toLowerCase() === label.toLowerCase()
      );
      return config ? config.value : false;
    }
    return false;
  }

  generateBarcode(): void {
    this.stickerPerLine = this.selectedProfile.stickerPerLine
    const generatedBarcodeImage: IVariantBarcodeImages = GenerateBarcode(
      this.selectedProfile,
      this.selectedProfileConfiguration,
      this.selectedProductVariant,
      this.quantity,
      this.selectedBranch,
      this.product.nameEnglish,
      this.mfgDate,
      this.expDate
    );

    if (!this.variantBarcodeImagesPdf) {
      this.variantBarcodeImagesPdf = {};
    }
    const selectedUnitName = this.selectedProductVariant?.unit?.nameEnglish;

    if (selectedUnitName) {
      if (!this.variantBarcodeImagesPdf[selectedUnitName]) {
        this.variantBarcodeImagesPdf[selectedUnitName] = generatedBarcodeImage[selectedUnitName];
      } else {
        this.variantBarcodeImagesPdf[selectedUnitName].images.push(...generatedBarcodeImage[selectedUnitName].images);

        const existingConfigurations = this.variantBarcodeImagesPdf[selectedUnitName].configuration.configurations;
        const newConfigurations = generatedBarcodeImage[selectedUnitName].configuration.configurations;
        const updatedConfigurations = UpdateBarcodeConfigurations(existingConfigurations, newConfigurations);
        this.variantBarcodeImagesPdf[selectedUnitName].configuration.configurations = updatedConfigurations;
      }
    }
    this.productVariantsPdf = this.clonerService.deepClone<ProductPrice[]>(this.productVariants);
    this.selectedProductVariant = null;
    this.quantity = 1;
    this.isShowConfiguration = false;
    this.selectedProfile = null;
    this.mfgDate = null;
    this.expDate = null;
    this.selectedBranch = null
  }

  clear(): void {
    for (const variantName of Object.keys(this.variantBarcodeImagesPdf)) {
      this.variantBarcodeImagesPdf[variantName].images = [];
    }
    this.productVariantsPdf = [];
    this.variantBarcodeImagesPdf = {};
  }

  deleteBarcodeImage(variantName: string, rowIndex: number, columnIndex: number): void {
    if (this.variantBarcodeImagesPdf[variantName]) {
      const images = this.variantBarcodeImagesPdf[variantName].images;
      if (images && images[rowIndex] && images[rowIndex][columnIndex]) {
        images[rowIndex].splice(columnIndex, 1);

        if (images.every((row) => row.length === 0)) {
          delete this.variantBarcodeImagesPdf[variantName];
        }
      }
    }

  }


  

  getBranchOrCompany(): void {
    this.sub$.sink = this.securityService.companyProfile.pipe(
      mergeMap((company: ICompany) =>
        this.branchService.getAllBranchesForDropdown(company.companyUUID).pipe(
          map((branches: IBranch[]) => [company, ...branches])
        )
      )
    ).subscribe((allBranches: CompanyOrBranch[]) => {
      this.allBranches = allBranches
    });
  }
  


  isVariantBarcodeImagesPdfEmpty(): boolean {
    return Object.keys(this.variantBarcodeImagesPdf).length === 0;
  }

  printBarcode(): void {
    setTimeout(() => {
      const name = 'Barcode Images';
      let printContents, popupWin;
      printContents = document.getElementById('barcode').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>${name}</title>
            <style>
              body {
                margin:0 !important;
              }
            </style>
            <script>
              function loadHandler() {
                var isChrome = function () {
                  return Boolean(window.chrome);
                };
                if (isChrome) {
                  window.print();
                  setTimeout(function () {
                    window.close();
                  }, 1000);
                } else {
                  window.print();
                  window.close();
                }
              }
            </script>
          </head>
          <body onload="loadHandler()">
          <style>
          @font-face {
            font-family: roboto;
            src: url(../../../assets/fonts/Roboto-Medium.ttf);
          }
          </style>
          ${printContents}
          </body>
        </html>
      `);
      popupWin.document.close();
    }, 1000);
  }


}
