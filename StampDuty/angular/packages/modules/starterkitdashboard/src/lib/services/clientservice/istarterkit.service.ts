import { Observable } from 'rxjs';
import { DocumentInfoVo, StumpDutySearchVo } from '../situqueryproxy/query/ServiceTypes';
import { RateConfigurationVo } from '../uploadproxy/query/ServiceTypes';

export abstract class IStarterkitClientService {
  public abstract GetUserDetails(): Observable<any>;
  public abstract GetuploadList(payload: DocumentInfoVo, BlotterClientViewModel): Observable<any>;
  public abstract GetRateConfigurationInfoList(BlotterClientViewModel): Observable<any>;
  public abstract GetGroupCompanyList(BlotterClientViewModel): Observable<any>;  
  public abstract GetReportList(payload: StumpDutySearchVo, BlotterClientViewModel): Observable<any>;
  public abstract Getdownloadfile(payload: number, documentName: string, BlotterClientViewModel): Observable<any>;
  public abstract GetdownloadReportfile(StumpDutySearchVo, BlotterClientViewModel): Observable<any>;
  public abstract GetdownloadDefaultReportfile(StumpDutySearchVo, BlotterClientViewModel): Observable<any>;
  public abstract UploadTemplateUat(UploadFormDocumentFile: FormData, strUrl: String): Observable<any>;
  public abstract DownloadTemplate(docIDNumnber: number, documentName: string): Observable<void>;
  public abstract GetuploadbugList(ayload: number, BlotterClientViewModel): Observable<any>;
  public abstract getGroupCompanyListUsingGet(): Observable<any>;
  public abstract saveRate(rateConfigurationVo: RateConfigurationVo): Observable<any>;
  public abstract deleteRate(rateConfigurationVo: RateConfigurationVo): Observable<any>;
  // public abstract uploadExcel(formData:FormData): Observable<any>; "build": "ts-node  ./build/index.ts --createproxy --stack_size=3200 \"$(which wsdl-to-ts)\"",
}