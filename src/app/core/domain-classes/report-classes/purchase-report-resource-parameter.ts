import { environment } from "@environments/environment"

export class ReportResourceParameter {
    device?: string = ''
    branch?: string = environment.branchUUID
    category?: string = ''
    product?: string = ''
    subcategory?: string = ''
    brand?: string = ''
    fromDate?: Date
    toDate?: Date
    supplier?: string = ''
    mode?: string = ''
    customer?: string = ''
}