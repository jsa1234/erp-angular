export interface DocumentInfo {
  id?: string;
  name?: string;
  url?: string;
  description?: string;
  createdDate?: Date;
  createdBy?: string;
  categoryId?: string;
  categoryName?: string;
  documentSource?: string;
  extension?: string;
  viewerType?: string;
  expiredDate?: Date;
  isAllowDownload?: boolean;
}


export interface IDocument{
  documentNoId:           number;
  documentType:           number;
  docPrefixLength:        number;
  docPrefix:              string;
  lastDocNo:              number;
  docNoLength:            number;
  deviceCode:             string;
  documentName:           string;
  consolidatedDocumentNo: string;
}