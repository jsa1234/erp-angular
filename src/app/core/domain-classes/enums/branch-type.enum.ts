export enum BranchType{
    STORE,
    WAREHOUSE
}
export type BranchTypeMapping = {
    key: BranchType;
    valueEnglish: string;
    valueSecondLanguage: string;
};

export const BranchTypeArray:BranchTypeMapping[] = [
    { key: BranchType.STORE, valueEnglish: 'Store', valueSecondLanguage: 'اليوم'  },
    { key: BranchType.WAREHOUSE, valueEnglish: 'Warehouse', valueSecondLanguage: 'هذا الاسبوع'  },
  ];

