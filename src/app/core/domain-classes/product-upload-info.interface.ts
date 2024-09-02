export interface ProductUploadInfo {
    productCode:        string;
    nameEnglish:        string;
    nameSecondLanguage: string;
    partNo:             string;
    hsnCode:            string;
    maxStockLevel:      number;
    reorderLevel:       number;
    margin:             number;
    unitLevel:          number;
    unitCost:           number;
    sellingPrice:       number;
    wholeSaleRate:      number;
    mrp:                number;
    cgst:               number;
    sgst:               number;
    igst:               number;
    cess:               number;
    addnlCess:          number;
    barcode:            string;
    unit:               string;
    qtyConversion:      number;
    category:           string;
    subCategory:        string;
    brand:              string;
    isEdit:             boolean
}