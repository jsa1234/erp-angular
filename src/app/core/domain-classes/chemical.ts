import { ChemicalTax } from './chemical-tax';
import { EntityState } from './entity-state';

export interface Chemical {
  id?: string;
  chemicalTypeId?: string;
  name: string;
  casNumber: string;
  hBondAcceptor?: string;
  hBondDonor?: string;
  iupacName?: string;
  inChIKey?: string;
  molecularFormulla?: string;
  molecularWeight?: string;
  synonyms?: string;
  chemicalDetailId?: string;
  objectState?: EntityState;
  chemicalImage?: string;
  url?: string;
  imageUrl?: string;
  supplierCount?: number;
  lstChemicalIndustries?: Array<string>;
  chemicalIndustries?: ChemicalIndustry[];
  customerCount?: number;
  isImageUpdate?: boolean;
  unitId?: string;
  unitName?: string;
  chemicalTaxes?: ChemicalTax[];
  purchasePrice?: number;
  salesPrice?: number;
}

export interface ChemicalIndustry {
  chemicalId?: string;
  industryId?: string;
  objectState?: EntityState
}
