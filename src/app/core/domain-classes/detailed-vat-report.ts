import { ICustomerAccount } from './customer-account';

export interface ITaxDetailedReport {
  taxSlabs?: number[];
  taxDetails?: ITaxDetail[];
  totalTaxableAmount?: number;
  totalTaxAmount?: number;
  totalAmount?: number;
  taxTotal?: ITaxTotal[];
  netTotalAmount :number;
  netTotalTaxAmount :number;
  netTotalTaxableAmount :number;
  taxes?: ITax[];
  taxTotals?: ITaxDetail[];
}

export interface ITaxDetail {
  taxes?: any[];
  totalTaxableAmount?: number;
  totalTaxAmount?: number;
  totalAmount?: number;
  month?: string;
  slab?: number;
  taxAmount?: number;
  taxableAmount?: number;
}

export interface ITaxTotal {
  slab?: number;
  totalTaxableAmount?: number;
  totalTaxAmount?: number;
}

export interface ITax {
  transactionDate?: Date;
  account?: ICustomerAccount;
  invoiceNumber?: string;
  taxDetails?: ITaxDetail[];
  totalTaxableAmount?: number;
  totalTaxAmount?: number;
  totalAmount?: number;
}
