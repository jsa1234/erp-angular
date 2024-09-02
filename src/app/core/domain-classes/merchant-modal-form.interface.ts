import { Bank } from "./bank.interface";
import { POSDevice } from "./pos-device.interface";
import { POSPrinter } from "./pos-printer.interface";

export interface MerchantModalForm {
    banks?: Bank | Bank[] | null;
    posDevices?: POSDevice | POSDevice[] | null; 
    posPrinters?: POSPrinter | POSPrinter[] | null; 
  }