import { POSPrinter } from "./pos-printer.interface";

export interface DevicePOSPrinter{
    devicePOSPrinterUUID?: string;
    deviceUUID?:           string;
    isDefaultPrinter?:     boolean;
    posPrinter?:           POSPrinter;
    posPrinterUUID?:      string;
}