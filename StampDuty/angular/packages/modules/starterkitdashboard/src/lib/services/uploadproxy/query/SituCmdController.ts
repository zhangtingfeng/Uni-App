/**
* Generated REST client by rest-client-generator
*/
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as fromRoot from 'adk-core';
import { ClientFactory, ServiceClient } from 'shared-framework';
import { ProxyServiceBase, HttpRequestType, AppSettingConfig, AppSettingsModel, ConfigItem } from 'adk-core';
import * as ServiceTypes from './ServiceTypes';
import { ISituCmdController } from './ISituCmdController';
/**
* Services stuff.
*/
@Injectable()
export class SituCmdController  extends ProxyServiceBase<ISituCmdController> implements ISituCmdController {
    constructor(public store$: Store<fromRoot.State>, public clientFactory: ClientFactory, public serviceClient: ServiceClient, public httpClient: HttpClient, @Inject(AppSettingConfig) public appSettingsConfig: AppSettingsModel) {
        super(store$, clientFactory, serviceClient, httpClient, appSettingsConfig);
    }
    substituteUrl(url: string, values: Object): string {
        Object.keys(values).map(key => {
          url = url.replace('{' + encodeURIComponent(key) + '}', encodeURIComponent(values[key]));
        });
        return url;
      }
    public saveRateUsingPost(_request: ServiceTypes.RateConfigurationVo): Observable<ServiceTypes.SituResponseRateConfigurationVo> {
        let _urlpath = this.substituteUrl('/api/Situ/rateconfiguration/saverate', {  } );
                let _requestInput = _request;
        let _requestType = HttpRequestType.POST;
            const _params = null;
            const _body = null;
        return this.ExecuteRequestAsync('UploadModule_ISituCmdController', 'saveRateUsingPost', _requestInput, _requestType, _params,  _urlpath)
        .pipe(
        map(response => {
            return response;
        }));
    }
    public saveGcUsingPost(_request: ServiceTypes.GroupCompanyVo): Observable<ServiceTypes.SituResponseGroupCompanyVo> {
        let _urlpath = this.substituteUrl('/api/Situ/gcconfiguration/savegc', {  } );
                let _requestInput = _request;
        let _requestType = HttpRequestType.POST;
            const _params = null;
            const _body = null;
        return this.ExecuteRequestAsync('UploadModule_ISituCmdController', 'saveGcUsingPost', _requestInput, _requestType, _params,  _urlpath)
        .pipe(
        map(response => {
            return response;
        }));
    }
    public journaldumpUsingPost(formData:FormData): Observable<ServiceTypes.SituResponseDocumentInfoVo> {
        let _urlpath = this.substituteUrl('/api/Situ/accountingupload/journaldump', {  } );
                let _requestInput = formData;
        let _requestType = HttpRequestType.POST;
            const _params = null;
            const _body = null;
        return this.ExecuteRequestAsync('UploadModule_ISituCmdController', 'journaldumpUsingPost', _requestInput, _requestType, _params,  _urlpath)
        .pipe(
        map(response => {
            return response;
        }));
    }
    public legalEntityDetailsUsingPost(formData:FormData): Observable<ServiceTypes.SituResponseDocumentInfoVo> {
        let _urlpath = this.substituteUrl('/api/Situ/accountingupload/LegalEntityDetails', {  } );
                let _requestInput = formData;
        let _requestType = HttpRequestType.POST;
            const _params = null;
            const _body = null;
        return this.ExecuteRequestAsync('UploadModule_ISituCmdController', 'legalEntityDetailsUsingPost', _requestInput, _requestType, _params,  _urlpath)
        .pipe(
        map(response => {
            return response;
        }));
    }
    public arapToTraderMappingUsingPost(formData:FormData): Observable<ServiceTypes.SituResponseDocumentInfoVo> {
        let _urlpath = this.substituteUrl('/api/Situ/accountingupload/ARAPToTraderMapping', {  } );
                let _requestInput = formData;
        let _requestType = HttpRequestType.POST;
            const _params = null;
            const _body = null;
        return this.ExecuteRequestAsync('UploadModule_ISituCmdController', 'arapToTraderMappingUsingPost', _requestInput, _requestType, _params,  _urlpath)
        .pipe(
        map(response => {
            return response;
        }));
    }
    public arapToCpMappingUsingPost(formData:FormData): Observable<ServiceTypes.SituResponseDocumentInfoVo> {
        let _urlpath = this.substituteUrl('/api/Situ/accountingupload/ARAPToCPMapping', {  } );
                let _requestInput = formData;
        let _requestType = HttpRequestType.POST;
            const _params = null;
            const _body = null;
        return this.ExecuteRequestAsync('UploadModule_ISituCmdController', 'arapToCpMappingUsingPost', _requestInput, _requestType, _params,  _urlpath)
        .pipe(
        map(response => {
            return response;
        }));
    }
    public deleteRateUsingGet(rateID: number): Observable<ServiceTypes.SituResponseBoolean> {
        let _urlpath = this.substituteUrl('/api/Situ/rateconfiguration/deleterate/{rateID}', { rateID: rateID } );
                let _requestInput = null;
        let _requestType = HttpRequestType.GET;
            const _params = null;
            const _body = null;
        return this.ExecuteRequestAsync('UploadModule_ISituCmdController', 'deleteRateUsingGet', _requestInput, _requestType, _params,  _urlpath)
        .pipe(
        map(response => {
            return response;
        }));
    }
    public deleteGcUsingGet(gcID: number): Observable<ServiceTypes.SituResponseBoolean> {
        let _urlpath = this.substituteUrl('/api/Situ/gcconfiguration/deletegc/{gcID}', { gcID: gcID } );
                let _requestInput = null;
        let _requestType = HttpRequestType.GET;
            const _params = null;
            const _body = null;
        return this.ExecuteRequestAsync('UploadModule_ISituCmdController', 'deleteGcUsingGet', _requestInput, _requestType, _params,  _urlpath)
        .pipe(
        map(response => {
            return response;
        }));
    }
}
