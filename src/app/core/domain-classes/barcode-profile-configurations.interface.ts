export interface IBarcodeProfileConfigurations{
    profileId:      number;
    profileName:    string;
    configurations: IConfiguration[];
}

export interface IConfiguration {
    label: string;
    value: boolean;
    key:string
    isShow: boolean;
}


export interface IVariantBarcodeImages {
    [variant: string]: {
      images: string[][];
      configuration: IBarcodeProfileConfigurations;
      variantName:string;
      variantUUID:string;
      stickerPerLine:number;
      companyName?:string;
      place?:string;
      contactNo?:string;
      email?:string;
      productName?:string;
      mrp?:number;
      exp?:Date;
      mfg?:Date;
      fssai?:string;
      sellingPrice?:number;
      wholesalePrice?:number
    };
  }