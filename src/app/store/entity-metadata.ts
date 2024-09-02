import { Brand } from '@core/domain-classes/brand';
import { Tax } from '@core/domain-classes/tax';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';
import { ProductCategory } from '@core/domain-classes/product-category';
import { Unit } from '@core/domain-classes/unit';
import { EntityMetadataMap } from '@ngrx/data';
import { Country } from '@core/domain-classes/country';
import { State } from '@core/domain-classes/state';
import { District } from '@core/domain-classes/district';

const entityMetadata: EntityMetadataMap = {
  DocumentCategory: {
  },
  Module: {
  },
  Page: {
  },
  Action: {
  },
  PageAction: {
  },
  DeliveryMethod: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false }
  },
  InquiryStatus: {
  },
  InquirySource: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false }
  },
  PaymentTerm: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false }
  },
  PackagingType: {
  },
  ExpenseCategory: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false }
  },
  Tax: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false },
    selectId:(tax:Tax)=>tax.taxUUID
  },
  Unit: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false },
    selectId:(unit:Unit)=>unit.unitUUID
  },
  Brand: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false },
    selectId:(brand:Brand)=>brand.brandUUID
  },
  ProductCategory: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false },
    selectId:(category:ProductCategory)=>category.categoryUUID
  },
  ProductSubCategory: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false },
    selectId:(subcategory:ProductSubcategory)=>subcategory.subCategoryUUID
  },
  Country: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false },
    selectId:(country:Country)=>country.countryUUID
  },
  State: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false },
    selectId:(state:State)=>state.stateUUID
  },
  District: {
    entityDispatcherOptions: { optimisticDelete: false, optimisticUpsert: false },
    selectId:(district:District)=>district.districtUUID
  }
};
const pluralNames = {
  DocumentCategory: 'DocumentCategories',
  Page: "Pages",
  Action: "Actions",
  PageAction: "PageActions",
  DeliveryMethod: 'DeliveryMethods',
  InquiryStatus: "InquiryStatuses",
  PackagingType: "PackagingTypes",
  InquirySource: "InquirySources",
  PaymentTerm: "PaymentTerms",
  ExpenseCategory: "ExpenseCategories",
  Tax: "Taxes",
  Unit:"Units",
  Brand:"Brands",
  ProductCategory:"ProductCategories",
  ProductSubCategory:"ProductSubCategories",
  Country:"Countries",
  State:"States",
  District:"Districts"
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
