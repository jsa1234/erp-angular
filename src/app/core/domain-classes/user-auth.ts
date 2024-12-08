import { IBranch } from './branch';
import { Claim } from './claim';
import { FinancialYearInfo } from './financial-year-info';

export class UserAuth {
  id?: string;
  userName: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  role:string;
  bearerToken: string = '';
  isAuthenticated: boolean = false;
  profilePhoto?: string;
  claims: Claim[] = [];
  logoUrl?: string;
  financialYear:FinancialYearInfo
  branchUUID:      string;
  deviceUUID:      string;
  companyGSTIN:string
  companyUUID:string
  branch:IBranch
}
