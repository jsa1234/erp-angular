import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { IPurchaseInvoice, PurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';
import { PurchaseInvoiceResourceParameter } from '@core/domain-classes/purchase-order/purchase-invoice-resource-parameter';
import { PurchaseOrder } from '@core/domain-classes/purchase-order/purchase-order';
import { PurchaseOrderItem } from '@core/domain-classes/purchase-order/purchase-order-item';
import { PurchaseOrderResourceParameter } from '@core/domain-classes/purchase-order/purchase-order-resource-parameter';
import { PurchaseReturnDetail } from '@core/domain-classes/purchase-order/purchase-return-details';
import { IPurchaseReturn } from '@core/domain-classes/purchase-order/purchase-return-invoice';
import { PurchaseReturnResourceParameter } from '@core/domain-classes/purchase-order/purchase-return-resource';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { CalculateAddnlCessAmount, CalculateAmount, CalculateCessAmount, CalculateCgstAmount, CalculateIgstAmount, CalculateItemTotalAmount, CalculateSgstAmount, CalculateTaxableAmount } from '@shared/helpers/tax-calculation.helper';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { PriceObject } from './purchase-manage/price.type';
import { PurchaseForm } from './purchase-manage/purchaseForm.interface';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }


    getAllPurchaseInvoice(
      resourceParams:PurchaseInvoiceResourceParameter
    ): Observable<HttpResponse<IPurchaseInvoice[]>> {
      const url = 'purchaseInvoice';
      const customParams = new HttpParams()
        .set('Fields', resourceParams.fields)
        .set('OrderBy', resourceParams.orderBy)
        .set('PageSize', resourceParams.pageSize.toString())
        .set('Skip', resourceParams.skip.toString())
        .set('SearchQuery', resourceParams.searchQuery)
        .set('name', resourceParams.name)
        .set('docDate', resourceParams.docDate ? resourceParams.docDate.toDateString() : '')
        .set('docNo', resourceParams.docNo)
        .set('fromDate', resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
        .set('toDate', resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
        .set('branchUUID', resourceParams.branchUUID ? resourceParams.branchUUID : '')
        .set('deviceUUID', resourceParams.deviceUUID ? resourceParams.deviceUUID : '');
      return this.http.get<IPurchaseInvoice[]>(url, {
        params: customParams,
        observe: 'response'
      });
    }

    getAllPurchaseReturn(
      resourceParams:PurchaseReturnResourceParameter
    ): Observable<HttpResponse<IPurchaseReturn[]>> {
      const url = 'purchaseReturn';
      const customParams = new HttpParams()
        .set('Fields', resourceParams.fields)
        .set('OrderBy', resourceParams.orderBy)
        .set('PageSize', resourceParams.pageSize.toString())
        .set('Skip', resourceParams.skip.toString())
        .set('SearchQuery', resourceParams.searchQuery)
        .set('name', resourceParams.name)
        .set('docDate', resourceParams.invoiceDate ? resourceParams.invoiceDate.toDateString() : '')
        .set('docNo', resourceParams.invoiceNumber)
        .set('fromDate', resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
        .set('toDate', resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
        .set('branchUUID', resourceParams.branchUUID ? resourceParams.branchUUID : '')
        .set('deviceUUID', resourceParams.deviceUUID ? resourceParams.deviceUUID : '');
      return this.http.get<IPurchaseReturn[]>(url, {
        params: customParams,
        observe: 'response'
      });
    }


    addPurchaseInvoice(purchaseInvoice: any): Observable<any | CommonError> {
      const url = `PurchaseInvoice`;
      return this.http.post<any>(url, purchaseInvoice)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    updatePurchaseInvoice(purchaseInvoice: IPurchaseInvoice): Observable<any | CommonError> {
      const url = `PurchaseInvoice/${purchaseInvoice.purchaseInvoiceUUID}`;
      return this.http.put<any>(url, purchaseInvoice)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }



  getAllPurchaseOrder(
    resourceParams: PurchaseOrderResourceParameter
  ): Observable<HttpResponse<PurchaseOrder[]>> {
    const url = 'purchaseorder';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('name', resourceParams.name)
      .set('orderNumber', resourceParams.orderNumber)
      .set('supplierName', resourceParams.supplierName)
      .set('chemicalName', resourceParams.chemicalName)
      .set('fromDate', resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
      .set('toDate', resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
      .set('chemicalId', resourceParams.chemicalId ? resourceParams.chemicalId : '')
      .set('supplierId', resourceParams.supplierId ? resourceParams.supplierId : '')
      .set('isPurchaseOrderRequest', resourceParams.isPurchaseOrderRequest)
      .set('status', resourceParams.status);
    return this.http.get<PurchaseOrder[]>(url, {
      params: customParams,
      observe: 'response'
    });
  }

  getPurchaseOrderItemReport(
    resourceParams: PurchaseOrderResourceParameter
  ): Observable<HttpResponse<PurchaseOrderItem[]>> {
    const url = 'purchaseorder/items/reports';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('name', resourceParams.name)
      .set('orderNumber', resourceParams.orderNumber)
      .set('supplierName', resourceParams.supplierName)
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
      .set('chemicalId', resourceParams.chemicalId? resourceParams.chemicalId:'')
      .set('chemicalName', resourceParams.chemicalName? resourceParams.chemicalName:'')
      .set('supplierId', resourceParams.supplierId ? resourceParams.supplierId : '')
      .set('isPurchaseOrderRequest', resourceParams.isPurchaseOrderRequest)
    return this.http.get<PurchaseOrderItem[]>(url, {
      params: customParams,
      observe: 'response'
    });
  }

  getAllPurchaseOrderItemReport(
    resourceParams: PurchaseOrderResourceParameter
  ): Observable<HttpResponse<PurchaseOrderItem[]>> {
    const url = 'purchaseorder/items/reports';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', 0)
      .set('Skip', 0)
      .set('SearchQuery', resourceParams.searchQuery)
      .set('name', resourceParams.name)
      .set('orderNumber', resourceParams.orderNumber)
      .set('supplierName', resourceParams.supplierName)
      .set('fromDate', resourceParams.fromDate?resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate?resourceParams.toDate.toDateString():'')
      .set('chemicalId', resourceParams.chemicalId?resourceParams.chemicalId:'')
      .set('chemicalName', resourceParams.chemicalName?resourceParams.chemicalName:'')
      .set('supplierId', resourceParams.supplierId ? resourceParams.supplierId : '')
      .set('isPurchaseOrderRequest', resourceParams.isPurchaseOrderRequest)
    return this.http.get<PurchaseOrderItem[]>(url, {
      params: customParams,
      observe: 'response'
    });
  }

  getAllPurchaseOrderReport(
    resourceParams: PurchaseOrderResourceParameter
  ): Observable<HttpResponse<PurchaseOrder[]>> {
    const url = 'purchaseorder/report';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('name', resourceParams.name)
      .set('orderNumber', resourceParams.orderNumber)
      .set('supplierName', resourceParams.supplierName)
      .set('fromDate', resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
      .set('toDate', resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
      .set('chemicalId', resourceParams.chemicalId ? resourceParams.chemicalId : '')
      .set('supplierId', resourceParams.supplierId ? resourceParams.supplierId : '')
      .set('isPurchaseOrderRequest', resourceParams.isPurchaseOrderRequest)
    return this.http.get<PurchaseOrder[]>(url, {
      params: customParams,
      observe: 'response'
    });
  }


  generateBarcodeSearchProductData(prodcutItem:ProductBarcode, formGroup:FormGroup,deviceUUID:string):Observable<PurchaseInvoiceDetail>{
    const invoiceType = formGroup.get('invoiceType').value
    const branchUUID = formGroup.get('branch')?.value || ''
    const pruchaseInvoiceUUID = formGroup.get('pruchaseInvoiceUUID')?.value
    const amount = +(CalculateAmount(prodcutItem.quantity||1,prodcutItem.unitPrice)).toFixed(2)
    const taxableAmount = +(CalculateTaxableAmount(amount,prodcutItem.discountAmount)).toFixed(2)
    const cgstAmount = +(CalculateCgstAmount(taxableAmount,prodcutItem.cgstRate,invoiceType)).toFixed(2)
    const sgstAmount = +(CalculateSgstAmount(taxableAmount,prodcutItem.sgstRate,invoiceType)).toFixed(2)
    const igstAmount = +(CalculateIgstAmount(taxableAmount,prodcutItem.igstRate,invoiceType)).toFixed(2)
    const cessAmount = prodcutItem.cessRate?+(CalculateCessAmount(invoiceType,prodcutItem.cessObj.taxBehaviour,prodcutItem.cessRate,taxableAmount,cgstAmount,sgstAmount,igstAmount)).toFixed(2):0
    const addnlCessAmount = prodcutItem.addnlCessRate?+(CalculateAddnlCessAmount(invoiceType,prodcutItem.addnlCessObj.taxBehaviour,prodcutItem.addnlCessRate,taxableAmount,cgstAmount,sgstAmount,igstAmount)).toFixed(2):0
    const itemTotalAmount = +(CalculateItemTotalAmount(taxableAmount,cgstAmount,sgstAmount,igstAmount,cessAmount,addnlCessAmount,invoiceType)).toFixed(2)

     const format:PurchaseInvoiceDetail = {
       addnlCessAmount: addnlCessAmount,
       addnlCessRate: prodcutItem.addnlCessRate || 0,
       amount: amount,
       branchUUID: branchUUID,
       cessAmount: cessAmount,
       cessRate: prodcutItem.cessRate || 0,
       cgstAmount: cgstAmount,
       cgstRate: prodcutItem.cgstRate || 0,
       deviceUUID: deviceUUID,
       discountAmount: prodcutItem?.discountAmount,
       discountRate: prodcutItem?.discountRate,
       igstAmount: igstAmount,
       igstRate: prodcutItem.igstRate || 0,
       itemTotalAmount: itemTotalAmount,
       product: JSON.stringify(prodcutItem?.product),//bug fix
       productObject: prodcutItem?.product,//bug fix
       productPriceUUID: prodcutItem?.productPriceUUID,
       productUUID: prodcutItem?.productUUID,
       purchaseInvoiceDetailUUID: uuid(),
       purchaseInvoiceUUID: pruchaseInvoiceUUID,
       quantity: prodcutItem?.quantity,
       sgstAmount: sgstAmount,
       sgstRate: prodcutItem.sgstRate || 0,
       unit: JSON.stringify(prodcutItem.unit),
       unitObject: prodcutItem.unit,
       unitPrice: prodcutItem?.unitPrice,
       unitUUID: prodcutItem?.unitUUID,
       barcode: prodcutItem?.barcode,
       taxableAmount: taxableAmount,
       addnlCessObj: prodcutItem.addnlCessObj,
       cessObj: prodcutItem.cessObj,
       taxObj: prodcutItem.taxObj,
       addnlCess: JSON.stringify(prodcutItem.addnlCessObj),
       cess:JSON.stringify(prodcutItem.cessObj),
       tax: JSON.stringify(prodcutItem.taxObj),
       addnlCessUUID:prodcutItem.addnlCessObj?prodcutItem.addnlCessObj.taxUUID:null,
       cessUUID:prodcutItem.cessObj?prodcutItem.cessObj.taxUUID:null,
       taxUUID:prodcutItem.taxObj?prodcutItem.taxObj.taxUUID:null,
       expiryDate:prodcutItem.expiryDate,
       manufactureDate:prodcutItem.manufactureDate
     }

    return of(format)
}

createPurchaseInvoiceData(formData:PurchaseForm,purchaseItem:PurchaseInvoiceDetail[],priceObject:PriceObject):IPurchaseInvoice{
  const formatedData:IPurchaseInvoice = {
    account:                '',
    accountUUID:            formData.accountUUID,
    addnlCessAmount:        priceObject.addnlCessAmount,
    branchUUID:             formData.branchUUID,
    cessAmount:             priceObject.cessAmount,
    cgstAmount:             priceObject.cgstAmount,
    createdBy:              '',
    deviceUUID:             formData.deviceUUID,
    discountAmount:         priceObject.discountAmount,
    docDate:                formData.docDate,
    docNo:                  formData.docNo,
    documentUUID:           uuid(),
    grossAmount:            priceObject.grossAmount,
    igstAmount:             priceObject.igstAmount,
    isComplete:             true,
    netTotalAmount:         priceObject.netTotalAmount,
    otherExpense:           priceObject.otherExpense,
    paymentRemark:          priceObject.remark,
    purchaseInvoiceDetails: purchaseItem,
    purchaseInvoiceUUID:    formData.purchaseInvoiceUUID,
    refBillDate:            formData.refBillDate,
    refBillNo:              formData.refBillNo,
    remark:                 priceObject.remark,
    roundedNetTotalAmount:  priceObject.roundedNetTotalAmount,
    roundOff:               priceObject.roundOff,
    sgstAmount:             priceObject.sgstAmount,
    status:                 1,
    subTotal:               priceObject.subTotal,
    transactionMode:        formData.transactionMode,
    transExpense:           priceObject.transExpense,
    invoiceType:            formData.invoiceType
  }
  return formatedData
}





  addPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder | CommonError> {
    const url = `PurchaseOrder`;
    return this.http.post<PurchaseOrder>(url, purchaseOrder)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updatePurchaseOrder(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder | CommonError> {
    const url = `PurchaseOrder/${purchaseOrder.id}`;
    return this.http.put<PurchaseOrder>(url, purchaseOrder)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deletePurchaseOrder(id: string): Observable<void | CommonError> {
    const url = `PurchaseOrder/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getNewPurchaseOrderNumber(isPurchaseOrder: boolean): Observable<PurchaseOrder> {
    const url = `purchaseorder/newOrderNumber/${isPurchaseOrder}`;
    return this.http.get<PurchaseOrder>(url);
  }


  getPurchaseOrderById(purchaseOrderId: string): Observable<PurchaseOrder> {
    const url = `purchaseorder/${purchaseOrderId}`;
    return this.http.get<PurchaseOrder>(url);
  }
  getPurchaseInvoiceById(purchaseOrderId: string): Observable<IPurchaseInvoice> {
    const url = `purchaseInvoice/${purchaseOrderId}`;
    return this.http.get<IPurchaseInvoice>(url);
  }
  getPurchaseReturnById(purchaseOrderId: string): Observable<IPurchaseReturn> {
    const url = `purchaseReturn/${purchaseOrderId}`;
    return this.http.get<IPurchaseReturn>(url);
  }
  getPurchaseOrderItems(purchaseOrderId: string,isReturn: boolean = false): Observable<PurchaseOrderItem[]> {
    const url = `purchaseorder/${purchaseOrderId}/items?isReturn=${isReturn}`;
    return this.http.get<PurchaseOrderItem[]>(url);
  }
  getPurchaseInvoicetems(purchaseOrderId: string): Observable<PurchaseInvoiceDetail[]> {
    const url = `purchaseInvoice/purchaseInvoiceDetails/${purchaseOrderId}`;
    return this.http.get<PurchaseInvoiceDetail[]>(url);
  }
  getPurchaseReturntems(purchaseOrderId: string): Observable<PurchaseReturnDetail[]> {
    const url = `purchaseReturn/PurchaseReturnDetails/${purchaseOrderId}`;
    return this.http.get<PurchaseReturnDetail[]>(url);
  }

  approvePurchaseOrder(purchaseOrderId: string): Observable<void> {
    const url = `purchaseorder/${purchaseOrderId}/approve`;
    return this.http.post<void>(url, {});
  }

  downloadAttachment(id: string): Observable<HttpEvent<Blob>> {
    const url = `PurchaseOrderAttachment/${id}/download`;
    return this.http.get(url, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }

  updatePurchaseOrderReturn(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder | CommonError> {
    const url = `PurchaseOrder/${purchaseOrder.id}/return`;
    return this.http.put<PurchaseOrder>(url, purchaseOrder)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }


  getPurchaseInvoicesBySupplier(suppplierUUID:string): Observable<IPurchaseInvoice[]> {
      const url = `PurchaseInvoice/GetPurchaseInvoicesBySupplier/${suppplierUUID}`;
      return this.http.get<IPurchaseInvoice[]>(url);
  }


  deletePurchase(purchaseInvoiceUUID:string):Observable<IPurchaseInvoice | CommonError>{
    const url = `PurchaseInvoice/${purchaseInvoiceUUID}`;
    return this.http.delete<IPurchaseInvoice>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  

  UpdatePrices(purchaseInvoiceDetail:PurchaseInvoiceDetail[]):Observable<any>{
    const url = 'Product_Web/UpdatePrices'
    return this.http.put<any>(url,purchaseInvoiceDetail)
  }
}
