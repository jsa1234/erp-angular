import { threadId } from 'worker_threads';
import { AccountGroup } from './enums/account-group.enum';

export class AccountHead implements IAccountHead{
  accountId: number;
  accountUUID: string;
  branchId: number;
  branchUUID: string;
  accountCode: string;
  accountType: number;
  nameEnglish: string;
  nameSecondLanguage: string;
  openingBalance: number;
  debitCredit: number;
  traySecurityRequired: boolean;
  accLevel: number;
  accGroup: AccountGroup;
  isDelete: boolean;
  accParentId: number;
  accParentUUID: string;

  constructor(
    _accountUUID: string,
    _accountCode: string,
    _accountType: number,
    _nameEnglish: string,
    _nameArabic: string,
    _accLevel: number,
    _accParentUUID: string,
    _openingBalance: number,
    _debitCredit: number
  ) {
    this.accLevel = _accLevel;
    this.accountUUID = _accountUUID;
    this.nameSecondLanguage = _nameArabic;
    this.nameEnglish = _nameEnglish;
    this.accountType = _accountType;
    this.accountCode = _accountCode;
    this.accParentUUID = _accParentUUID;
    this.openingBalance = _openingBalance;
    this.debitCredit = _debitCredit;
  }
}

export interface IAccountHead{
  accountId: number;
  accountUUID: string;
  branchId: number;
  branchUUID: string;
  accountCode: string;
  accountType: number;
  nameEnglish: string;
  nameSecondLanguage: string;
  openingBalance: number;
  debitCredit: number;
  traySecurityRequired: boolean;
  accLevel: number;
  accGroup: AccountGroup;
  isDelete: boolean;
  accParentId: number;
  accParentUUID: string;
}
