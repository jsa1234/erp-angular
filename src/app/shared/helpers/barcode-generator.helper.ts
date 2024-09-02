import {
  IBarcodeProfileConfigurations,
  IVariantBarcodeImages,
} from '@core/domain-classes/barcode-profile-configurations.interface';
import { IBarcodeProfile } from '@core/domain-classes/barcode-profile.interface';
import { IBranch } from '@core/domain-classes/branch';
import { IProduct, ProductPrice } from '@core/domain-classes/product';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';
import { CompanyOrBranch } from '@core/domain-classes/types/company-or-branch.type';
import * as JsBarcode from 'jsbarcode';

export function GenerateBarcode(
  barcodeProfile: IBarcodeProfile,
  configuration: IBarcodeProfileConfigurations,
  productVariant: ProductPrice,
  quantity: number,
  companyOrBranch:CompanyOrBranch,
  productName:string,
  mfgDate:Date,
  expDate:Date
): IVariantBarcodeImages {
  const selectedUnitName = productVariant?.unit?.nameEnglish;
  let variantBarcodeImages: IVariantBarcodeImages = {};

  // Create a new entry for the selected variant if it doesn't exist
  if (!variantBarcodeImages[selectedUnitName]) {
    variantBarcodeImages[selectedUnitName] = {
      images: [],
      configuration: configuration,
      variantName: selectedUnitName,
      variantUUID: productVariant.productPriceUUID,
      stickerPerLine: barcodeProfile.stickerPerLine,
      companyName:companyOrBranch.nameEnglish,
      place:companyOrBranch.placeEnglish,
      contactNo:`${companyOrBranch.mobileCountryCode} ${companyOrBranch.mobileNo}`,
      email:companyOrBranch.email,
      productName:productName,
      mrp:productVariant?.mrp,
      mfg:mfgDate,
      exp:expDate,
      fssai:companyOrBranch.fssaiNumber,
      sellingPrice:productVariant?.sellingPrice,
      wholesalePrice:productVariant?.wholeSaleRate
    };
  }
const barcodeValue:string = productVariant?.barcode || productName
  const barcodeImages = [];

  for (let i = 0; i < quantity; i++) {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeValue, {
      format: barcodeProfile?.barcodeType == 0 ? 'code128' : '',
      displayValue: false,
      width: 1,
      height: 12,
      marginLeft: barcodeProfile.stickerPerLine == 1 ? 1 : 5,
      marginRight: 1,
      marginBottom: 1,
      marginTop: 1,
    });
    barcodeImages.push(canvas.toDataURL('image/svg'));
  }

  const arrangedImages = [];
  for (
    let i = 0;
    i < barcodeImages.length;
    i += barcodeProfile.stickerPerLine
  ) {
    const row = barcodeImages.slice(i, i + barcodeProfile.stickerPerLine);
    arrangedImages.push(row);
  }

  variantBarcodeImages[selectedUnitName].images = arrangedImages;
  console.table(variantBarcodeImages)
  return variantBarcodeImages;
}

export function UpdateBarcodeConfigurations(
  existingConfigurations,
  newConfigurations
) {
  for (const existingConfig of existingConfigurations) {
    const matchingConfig = newConfigurations.find(
      (newConfig) => newConfig.key === existingConfig.key
    );
    if (matchingConfig) {
      existingConfig.value = matchingConfig.value;
    }
  }
  return existingConfigurations; // Return the updated array
}

export function GeneratePurchaseBarcode(
  barcodeProfile: IBarcodeProfile,
  configuration: IBarcodeProfileConfigurations,
  productVariant: ProductPrice,
  variantName:string,
  variantUUID:string,
  expDate:Date,
  mfgDate:Date,
  quantity: number,
  productName:string,
  branch:IBranch
): IVariantBarcodeImages {
  const selectedVariant = variantUUID;
  const selectedVariantName = variantName;
  let variantBarcodeImages: IVariantBarcodeImages = {};

  if (!variantBarcodeImages[selectedVariant]) {
    variantBarcodeImages[selectedVariant] = {
      images: [],
      configuration: configuration,
      variantName: selectedVariantName,
      variantUUID: selectedVariant,
      stickerPerLine: barcodeProfile.stickerPerLine,
      companyName:branch.nameEnglish,
      email:branch.email,
      contactNo:`${branch.mobileCountryCode} ${branch.mobileNo}`,
      exp:expDate || null,
      mfg:mfgDate || null,
      fssai:branch.fssaiNumber,
      mrp:productVariant.mrp,
      place:branch.placeEnglish,
      productName:productName,
      sellingPrice:productVariant.sellingPrice,
      wholesalePrice:productVariant.wholeSaleRate
    };
  }

  let barcodeLabel: ProductPrice = productVariant
    // typeof productVariant.productPrice === 'string'
    //   ? JSON.parse(productVariant.productPrice)
    //   : productVariant.productPrice;

  const barcodeImages = [];
  for (let i = 0; i < quantity; i++) {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeLabel?.barcode, {
      format: barcodeProfile?.barcodeType == 0 ? 'code128' : '',
      displayValue: true,
      width: 1.5,
      height: 30,
      textAlign: 'left',
      fontSize: 12,
    });
    barcodeImages.push(canvas.toDataURL('image/png'));
  }

  const arrangedImages = [];
  for (
    let i = 0;
    i < barcodeImages.length;
    i += barcodeProfile.stickerPerLine
  ) {
    const row = barcodeImages.slice(i, i + barcodeProfile.stickerPerLine);
    arrangedImages.push(row);
  }

  variantBarcodeImages[selectedVariant].images = arrangedImages;
  console.log('barcode from helper', variantBarcodeImages);
  return variantBarcodeImages;
}
