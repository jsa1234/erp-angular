import { Bank } from "./bank.interface";
import { POSDevice } from "./pos-device.interface";
import { POSPrinter } from "./pos-printer.interface";

export interface MerchantAccountModal{
  banks?:Bank[];
  posDevices?:POSDevice[];
  posPrinters?:POSPrinter[];
  isDevice?:boolean
  isBank?:boolean;
  isPosPrinter?:boolean;
  isDeviceMultiple?:boolean;
  isBankMultiple?:boolean;
  isPosPrinterMultiple?:boolean;
}