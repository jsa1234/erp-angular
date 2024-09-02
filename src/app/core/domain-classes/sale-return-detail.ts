import { IProduct } from "./product";
import { Unit } from "./unit";

export class SaleReturnDetail{
  saleReturnDetailId:    number;
  saleReturnDetailUUID:  string;
  saleReturnId:          number;
  saleReturnUUID:        string;
  saleInvoiceDetailUUID: string;
  productUUID:           string;
  product:               string;
  productObject:         IProduct;
  unitUUID:              string;
  unit:                  string;
  unitObject:            Unit;
  quantity:              number;
  returnQuanity:         number;
  unitPrice:             number;
  amount:                number;
  discountRate:          number;
  discountAmount:        number;
  vatRate:               number;
  vatAmount:             number;
  itemTotalAmount:       number;
  branchId:              number;
  branchUUID:            string;
  deviceId:              number;
  deviceUUID:            string;
  createdBy:             string;
  modifiedBy:            string;
}
