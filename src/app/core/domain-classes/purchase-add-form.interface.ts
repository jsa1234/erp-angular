import { InvoiceType } from "./enums/invoice-type.enum";

export interface IPurchaseAddForm {
    pruchaseInvoiceUUid: string; // Assuming uuid() generates a string
    invoiceNo: string;
    invoiceDate: Date; // You may want to use a Date type here
    reffBillNo: string;
    refBillDate: Date; // You may want to use a Date type here
    branch: string;
    supplier: string;
    mode: number;
    remarks:number;
    invoiceType:InvoiceType
  }
  