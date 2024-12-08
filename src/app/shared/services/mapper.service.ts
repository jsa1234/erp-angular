import { Injectable } from "@angular/core";
import { Bank } from "@core/domain-classes/bank.interface";
import { IDamageEntryDetail } from "@core/domain-classes/damage-entry-details.interface";
import { IDamageEntry } from "@core/domain-classes/damage-entry.interface";
import { POSDevice } from "@core/domain-classes/pos-device.interface";
import { ProductBarcode } from "@core/domain-classes/product-barcode.interface";
import { IPurchaseInvoice, PurchaseInvoice } from "@core/domain-classes/purchase-order/purchase-invoice";
import { PurchaseInvoiceDetail } from "@core/domain-classes/purchase-order/purchase-invoice-details";
import { PurchaseReturnDetail } from "@core/domain-classes/purchase-order/purchase-return-details";
import { IPurchaseReturn } from "@core/domain-classes/purchase-order/purchase-return-invoice";
import { IStockTransfer } from "@core/domain-classes/stock-transfe.interface";
import { IStockTransferItem } from "@core/domain-classes/stock-transfer-items.interface";
import { StockTransferForm } from "src/app/inventory/stock-transfer/manage-stock-transfer/stock-transfer-form.interface";
import {v4 as uuid} from 'uuid'
@Injectable({providedIn:'root'})
export class MapperService{


    mapArrayToStockTransferItems(productBarcodeArray: ProductBarcode[],stcockTransferUUID:string): IStockTransferItem[] {
        return productBarcodeArray.map(productBarcode => this.mapToStockTransferItem(productBarcode,stcockTransferUUID,false));
      }



    mapToStockTransferItem(productBarcode: ProductBarcode , stcockTransferUUID:string,isBarcodeScanned:boolean): IStockTransferItem {

      const product = productBarcode.product ;

      const amount  = isBarcodeScanned? productBarcode.unitPrice* productBarcode.quantity :  productBarcode.amount
        const stockTransferItem: IStockTransferItem = {
          stockTransferDetailUUID: uuid(), // You can modify this accordingly
          stockTransferDetailId: 0,
          stockTransferUUID: stcockTransferUUID, 
          productUUID: productBarcode.productUUID,
          productPriceUUID: productBarcode.productPriceUUID,
          unitUUID: productBarcode.unitUUID,
          quantity: productBarcode.quantity,
          unitPrice: productBarcode.unitPrice,
          netTotalAmount: amount, // You may need to adjust this based on your business logic
          productJson: JSON.stringify(product),
          productPriceJson: JSON.stringify(product.productPrices),
          unitJson: JSON.stringify(productBarcode.unit),
          unit: productBarcode.unit,
          product: product,
          productPrice: product.productPrices.find(x=>x.productPriceUUID == productBarcode.productPriceUUID)
        };
    
        return stockTransferItem;
      }


      mapStockTransferSave(formValue:IStockTransfer,stockTransferItem:IStockTransferItem[],total:number):IStockTransfer{
        const formData = formValue
        formData.netTotalAmount = total
        formData.stockTransferDetails= stockTransferItem
          return formData
      }

      mapArrayToDamageEntryItems(productBarcodeArray:ProductBarcode[],damageUUID:string,isBarcodeScanned:boolean):IDamageEntryDetail[]{
        return productBarcodeArray.map(productBarcode => this.mapToDamageEntryItem(productBarcode,damageUUID,isBarcodeScanned));
      }

      mapToDamageEntryItem(productBarcode: ProductBarcode,damageUUID:string,isBarcodeScanned:boolean):IDamageEntryDetail{
        const product = productBarcode.product;

        const amount  = isBarcodeScanned? productBarcode.unitPrice* productBarcode.quantity :  productBarcode.amount
        const stockTransferItem: IDamageEntryDetail = {
          damageDetailUUID: uuid(),
          damageUUID:       damageUUID,
          productUUID:      productBarcode.productUUID,
          productPriceUUID: productBarcode.productPriceUUID,
          unitUUID:         productBarcode.unitUUID,
          damageQuantity:   1,
          quantity:         productBarcode.quantity,
          averageRate:      productBarcode.unitPrice,
          totalAmount:      amount,
          description:      '',
          unitJson:         JSON.stringify(productBarcode.unit) ,
          productJson:      JSON.stringify(product),
          productPriceJson: JSON.stringify(product.productPrices),
          product:          product,
          unit:             productBarcode.unit,
          productPrice:     product.productPrices,
          barcode:          productBarcode.barcode
        };
        return stockTransferItem
      }


      mapDamageEntrySave(formValue:IDamageEntry,damageDetails:IDamageEntryDetail[],total:number):IDamageEntry{
        const formData = formValue
        formData.netTotalAmount = total
        formData.damageDetails= damageDetails
          return formData
      }



      mapArrayToPurchaseReturnItems(purchaseItems:PurchaseInvoiceDetail[]):PurchaseReturnDetail[]{
        return purchaseItems.map(item => this.mapToPurchaseReturnItem(item));
      }

      mapToPurchaseReturnItem(item:PurchaseInvoiceDetail):PurchaseReturnDetail{
          const purchaseReturnItem: PurchaseReturnDetail = {
            purReturnDetailUUID:uuid(),
            purchaseInvoiceDetailUUID:item.purchaseInvoiceDetailUUID,
            purchaseReturnUUID:uuid(),
            productUUID: item.productUUID,
            product:item.product,
            productObject:item.productObject,
            unitObject:item.unitObject,
            productPriceUUID:item.productPriceUUID,
            productPrice: JSON.stringify(item.productPrice),
            unitUUID: item.unitUUID,
            unit: item.unit,
            quantity: item.quantity,
            returnQuantity: item.quantity,
            unitPrice: item.unitPrice,
            amount:item.amount,
            discountRate: item.discountRate,
            discountAmount: item.discountAmount,
            itemTotalAmount: item.itemTotalAmount,
            branchUUID: item.branchUUID,
            deviceUUID: item.deviceUUID,
            purInvoiceDetailUUID: item.purchaseInvoiceDetailUUID,
            cgstRate:             item.cgstRate,
            sgstRate:             item.sgstRate,
            igstRate:             item.igstRate,
            cessRate:             item.cessRate,
            addnlCessRate:        item.addnlCessRate,
            cgstAmount:           item.cgstAmount,
            sgstAmount:           item.sgstAmount,
            igstAmount:           item.igstAmount,
            cessAmount:           item.cessAmount,
            addnlCessAmount:      item.addnlCessAmount,
            taxableAmount:    item.amount-item.discountAmount,
            cessObj:item.cessObj,
            taxObj:item.taxObj,
            addnlCessObj:item.addnlCessObj
          };
      
          return purchaseReturnItem;
      }


      mapPurchaseReturn(purchase:IPurchaseInvoice):IPurchaseReturn{
        const purchaseReturn:IPurchaseReturn = {
          purchaseInvoiceUUID:   purchase.purchaseInvoiceUUID,
          refInvDate:            purchase.docDate,
          subTotal:              purchase.subTotal,
          discountAmount:        purchase.discountAmount,
          grossAmount:           purchase.grossAmount,
          otherExpense:          purchase.otherExpense,
          transExpense:          purchase.transExpense,
          netTotalAmount:        purchase.netTotalAmount,
          roundNetTotalAmount:   purchase.roundedNetTotalAmount,
          roundOff:              purchase.roundOff || 0,
          cgstAmount:            purchase.cgstAmount,
          sgstAmount:            purchase.sgstAmount,
          igstAmount:            purchase.igstAmount,
          cessAmount:            purchase.cessAmount,
          addnlCessAmount:       purchase.addnlCessAmount
        }

        return purchaseReturn
      }


      mapPurchaseReturnSave(formValue:IPurchaseReturn,purchaseReturnItems:PurchaseReturnDetail[],purchase:IPurchaseReturn):IPurchaseReturn{
        const formatData ={...formValue, ...purchase}
        formatData.purchaseReturnDetails = purchaseReturnItems
        return formatData
      }

      
      mapPaymentMerchantAccount(formvalue:any,paymentBanks:Bank[],payemnetDevices:POSDevice[]):any{
        const a = formvalue
        a.posMerchantBanks = paymentBanks.map((bank:Bank)=>({
          posMerchantBankUUID: bank.posMerchantBankUUID,
          posMerchantUUID: bank.posMerchantUUID,
          isDefaultBank: bank.isDefaultBank,
          accountUUID: bank.accountUUID,
        }))
    
        a.posMerchantDevices = payemnetDevices.map((device: POSDevice) => ({
          posDeviceUUID: device.posDeviceUUID,
          posMerchantUUID: device.posMerchantUUID,
          descriptionEnglish: device.descriptionEnglish,
          descriptionSecondLanguage: device.descriptionSecondLanguage,
          posMerchantDevicesUUID: device.posMerchantDevicesUUID,
          posMerchantDeviceBanks: device.posMerchantDeviceBanks.map((deviceBank: Bank) => ({
            accountUUID: deviceBank.accountUUID,
            isDefaultBank: deviceBank.isDefaultBank
          })),
        }))
    
        return a
      }
}