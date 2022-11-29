/**
* Generated REST client by rest-client-generator
*/
import { Observable } from 'rxjs';
import * as ServiceTypes from './ServiceTypes';
/**
* Services stuff.
*/
export abstract class ISituCmdController {
    abstract saveRateUsingPost(_request: ServiceTypes.RateConfigurationVo): Observable<ServiceTypes.SituResponseRateConfigurationVo>;
    abstract saveGcUsingPost(_request: ServiceTypes.GroupCompanyVo): Observable<ServiceTypes.SituResponseGroupCompanyVo>;
    

abstract journaldumpUsingPost(formData:FormData): Observable<ServiceTypes.SituResponseDocumentInfoVo>;
abstract legalEntityDetailsUsingPost(formData:FormData): Observable<ServiceTypes.SituResponseDocumentInfoVo>;
abstract arapToTraderMappingUsingPost(formData:FormData): Observable<ServiceTypes.SituResponseDocumentInfoVo>;
abstract arapToCpMappingUsingPost(formData:FormData): Observable<ServiceTypes.SituResponseDocumentInfoVo>;

abstract deleteRateUsingGet(rateID: number): Observable<ServiceTypes.SituResponseBoolean>;
abstract deleteGcUsingGet(gcID: number): Observable<ServiceTypes.SituResponseBoolean>;

}
  
