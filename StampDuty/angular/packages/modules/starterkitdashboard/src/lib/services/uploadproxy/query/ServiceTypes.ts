/**
* Generated REST client by rest-client-generator
*/
/**
* Request/response types and enumerations.
*/
export interface Sample {
    sample: string;
}
   export interface RateConfigurationVo  {
       createdBy?: string;
       createdTimestamp?: Date;
       ID?: number;
       TaxableItem?: string;
       Rate?: number;
       DisplayCNText?: string;
       ValidFrom?: Date;
       ValidTo?: Date;
}
   export interface ErrorMessage  {
       code?: string;
       message?: string;
}
   export interface MetaMessage  {
       message?: string;
}
   export interface SituResponseRateConfigurationVo  {
       data?: RateConfigurationVo;
       meta?: MetaMessage[];
       errors?: ErrorMessage[];
}
   export interface GroupCompanyVo  {
       groupCompanyID?: number;
       groupCompanyCode?: string;
       groupCompanyCNName?: string;
       groupCompanyENName?: string;
       gcStampDutyTemplateID?: number;
}
   export interface SituResponseGroupCompanyVo  {
       data?: GroupCompanyVo;
       meta?: MetaMessage[];
       errors?: ErrorMessage[];
}
   export interface DocumentHeadDto  {
       docType?: string;
       fileName?: string;
       snapshotYear?: string;
       snapshotMonth?: string;
       GroupCompanyCode?: string;
       GroupCompanyCNName?: string;
}
   export interface DocumentInfoVo  {
       docID?: number;
       docType?: string;
       snapshotYear?: string;
       snapshotMonth?: string;
       groupCompanyCode?: string;
       groupCompanyCNName?: string;
       fileName?: string;
       active?: string;
       uploadStatus?: string;
       systemMessage?: string;
       messageCount?: number;
       createdBy?: string;
       createdTimestamp?: Date;
}
   export interface SituResponseDocumentInfoVo  {
       data?: DocumentInfoVo;
       meta?: MetaMessage[];
       errors?: ErrorMessage[];
}
   export interface SituResponseBoolean  {
       data?: boolean;
       meta?: MetaMessage[];
       errors?: ErrorMessage[];
}
