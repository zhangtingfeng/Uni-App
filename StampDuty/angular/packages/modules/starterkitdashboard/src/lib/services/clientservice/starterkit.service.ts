import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { catchError, debounceTime, map, Observable, of, Subscriber, tap } from 'rxjs';
import { BlotterClientViewModel } from '../../presentation/activities/blotterclient/blotterclient.viewmodel';
import { IAppDataQryController } from '../situqueryproxy/query/IAppDataQryController';
import { IAppDownloadDataQryController } from '../situqueryproxy/query/IAppDownloadDataQryController';
import { DocumentInfoVo, StumpDutySearchVo } from '../situqueryproxy/query/ServiceTypes';
import { ISituCmdController } from '../uploadproxy/query/ISituCmdController';
import { RateConfigurationVo } from '../uploadproxy/query/ServiceTypes';



import { IStarterkitClientService } from './istarterkit.service';


@Injectable()
export class StarterkitClientService implements IStarterkitClientService {
    /*public GetRm(payload: SearchVo): Observable<any> {
        throw new Error('Method not implemented.');
    }*/

    constructor(
        public appDataQryController: IAppDataQryController,
        public dataQueryController: IAppDataQryController,
        public AppDownloadDataQryController: IAppDownloadDataQryController,
        public situCmdController: ISituCmdController
    ) {

    }

    public GetUserDetails(): Observable<any> {
        return this.dataQueryController.userDetailUsingGet().pipe(
            map(x => {
                return x.data;
            }),
            catchError((err: any) => {
                return of(undefined);
            })
        );
    }

    public GetReportList(payload: StumpDutySearchVo, anydashboardholderTarget: BlotterClientViewModel): Observable<any> {

        anydashboardholderTarget.InProgressMessage = 'Loading...';
        return this.dataQueryController.reportGenerationUsingPost(payload).pipe(

            map(x => {
                // debugger;
                anydashboardholderTarget.InProgressMessage = '';
                return x.data;
            }),
            catchError((err: any) => {
                return of(this.SetErrorHandler(err));
                //return of(undefined);
            })

        );
    }

    public GetRateConfigurationInfoList(anydashboardholderTarget: BlotterClientViewModel): Observable<any> {

        // debugger;
        anydashboardholderTarget.InProgressMessage = 'Loading...';
        return this.dataQueryController.getRateConfigurationInfoListUsingGet().pipe(
            map(x => {
                anydashboardholderTarget.InProgressMessage = '';
                // debugger;
                return x.data;
            }),
            catchError((err: any) => {
                anydashboardholderTarget.InProgressMessage = '';
                return of(this.SetErrorHandler(err));
                //return of(undefined);
            })

        );
    }
    public GetGroupCompanyList(anydashboardholderTarget: BlotterClientViewModel): Observable<any> {

        // debugger;
        anydashboardholderTarget.InProgressMessage = 'Loading...';
        return this.dataQueryController.getGroupCompanyListUsingGet().pipe(
            map(x => {
                anydashboardholderTarget.InProgressMessage = '';
                // debugger;
                return x.data;
            }),
            catchError((err: any) => {
                anydashboardholderTarget.InProgressMessage = '';
                return of(this.SetErrorHandler(err));
                //return of(undefined);
            })

        );
    }

    public GetuploadList(payload: DocumentInfoVo, anydashboardholderTarget: BlotterClientViewModel): Observable<any> {

        // debugger;
        anydashboardholderTarget.InProgressMessage = 'Loading...';
        return this.dataQueryController.docInfoUsingPost(payload).pipe(
            map(x => {
                anydashboardholderTarget.InProgressMessage = '';
                // debugger;
                return x.data;
            }),
            catchError((err: any) => {
                anydashboardholderTarget.InProgressMessage = '';
                return of(this.SetErrorHandler(err));
                //return of(undefined);
            })

        );
    }

    public Getdownloadfile(payload: number, documentName: string, anydashboardholderTarget: BlotterClientViewModel): Observable<any> {


        //let dddd=  AppHttpInterceptor;
        anydashboardholderTarget.InProgressMessage = 'Loading...';
        return this.AppDownloadDataQryController.downloadSourceFile1UsingGet(payload).pipe(
            map(x => {

                // debugger;
                let o: any = x;
                let contentType = x.type;
                let downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(new Blob([o], { type: contentType }));
                downloadLink.setAttribute('download', x.fileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();
                anydashboardholderTarget.InProgressMessage = '';
                return x;
            }),
            catchError(async (err: any) => {
                //debugger;
                /* Unexpected token 'P', "PK
                Http failure during parsing for http://10.193.77.234:5001/situquery/downloadsourcefile/22
                Unexpected token 'P', "PK
                SyntaxError: Unexpected token 'P', "PK
                
                let error = await err.error.text();
                 error = JSON.parse(error);
                 let message: string[] = [];
                 if (error.errors) {
                     error.errors.forEach(x => {
                         message.push(x.message);
                     })
                 }
                 return (message);*/
                return of(this.SetErrorHandler(err));
                //return "error";
            }))

    }


    public GetdownloadReportfile(responseupload1: StumpDutySearchVo, anydashboardholderTarget: BlotterClientViewModel): Observable<any> {

        anydashboardholderTarget.InProgressMessage = 'Loading...';

        return this.AppDownloadDataQryController.downloadReportUsingPost(responseupload1).pipe(
            tap(x => {


            }),
            map(x => {
                //debugger;
                //tick(5000);


                let o: any = x;
                let contentType = x.type;
                let downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(new Blob([o], { type: contentType }));
                downloadLink.setAttribute('download', x.fileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();
                anydashboardholderTarget.InProgressMessage = '';
                return x;
            }),

            catchError(async (err: any) => {
                // debugger;
                anydashboardholderTarget.InProgressMessage = '';
                return of(this.SetErrorHandler(err));
                //return "error";
            }))

    }

    public GetdownloadDefaultReportfile(responseupload1: StumpDutySearchVo, anydashboardholderTarget: BlotterClientViewModel): Observable<any> {

        anydashboardholderTarget.InProgressMessage = 'Loading...';

        return this.AppDownloadDataQryController.downloadDefaultReportUsingPost(responseupload1).pipe(
            tap(x => {


            }),
            map(x => {
                let o: any = x;
                let contentType = x.type;
                let downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(new Blob([o], { type: contentType }));
                downloadLink.setAttribute('download', x.fileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();
                anydashboardholderTarget.InProgressMessage = '';
                return x;
            }),

            catchError(async (err: any) => {
                // debugger;
                anydashboardholderTarget.InProgressMessage = '';
                return of(this.SetErrorHandler(err));

                //return "error";
            }))

    }

    public DownloadTemplate(docIDNumnber: number, documentName: string): Observable<any> {
        //let req = this.apInvoicesMapper.MapDownloadTemplateToDTO(selRows);
        let _request: DocumentInfoVo;
        _request = {
            docID: docIDNumnber
        }
        return this.AppDownloadDataQryController.downloadSourceFileUsingPost(_request).pipe(
            map(x => {
                debugger;
                let o: any = x;
                let contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                let downloadLink = document.createElement('a');
                let FileName = 'AP_Portal_' + documentName;
                downloadLink.href = window.URL.createObjectURL(new Blob([o], { type: contentType }));
                downloadLink.setAttribute('download', FileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();
            }),

            catchError((err: any) => {
                //debugger;
                return of(this.SetErrorHandler(err));
                //return of(undefined);
            }));
    }


    /*
    public uploadExcel(formData:FormData): Observable<any> {
 
        return this.situCmdController.rmUsingPost(formData).pipe(
           
            map(x => {
               // debugger;
                return x.data;
            }),
            catchError((err: any) => {
                return of(undefined);
            })

        );
    }'/api/Situ/accountingupload/journaldump'*/

    ////conmmon transfer para
    public UploadTemplateUat(UploadFormDocumentFile: FormData, strUplaodID: String): Observable<any> {

        switch (strUplaodID) {
            case 'accountingsales_costjournaldump':
                return this.situCmdController.journaldumpUsingPost(UploadFormDocumentFile).pipe(

                    map(x => {
                        //debugger;
                        return x.data;
                    }),
                    catchError((err: any) => {
                        return of(this.SetErrorHandler(err));
                    })
                );
                break;
            case 'accountingar_ap_cpmapping':
                //stringURLdddd = '/api/Situ/accountingupload/ARAPToCPMapping';

                return this.situCmdController.arapToCpMappingUsingPost(UploadFormDocumentFile).pipe(

                    map(x => {
                        //debugger;
                        return x.data;
                    }),
                    catchError((err: any) => {
                        return of(this.SetErrorHandler(err));
                    })

                );
                break;
            case 'accountingar_ap_trademapping':
                //stringURLdddd = '/api/Situ/accountingupload/ARAPToTraderMapping';

                return this.situCmdController.arapToTraderMappingUsingPost(UploadFormDocumentFile).pipe(

                    map(x => {
                        //debugger;
                        return x.data;
                    }),
                    catchError((err: any) => {
                        return of(this.SetErrorHandler(err));
                    })

                );
                break;

            case 'legalentitydetails':
                //stringURLdddd = '/api/Situ/accountingupload/LegalEntityDetails';
                return this.situCmdController.legalEntityDetailsUsingPost(UploadFormDocumentFile).pipe(

                    map(x => {
                        //debugger;
                        return x.data;
                    }),
                    catchError((err: any) => {
                        return of(this.SetErrorHandler(err));
                        //return of(undefined);
                    })

                );
                break;

        }
    }

    public saveRate(rateConfigurationVo: RateConfigurationVo): Observable<any> {
        return this.situCmdController.saveRateUsingPost(rateConfigurationVo).pipe(
            map(x => {
              
                return x.data;
            }),
            catchError((err: any) => {
                return of(this.SetErrorHandler(err));
            })
        );
       

    }
    public deleteRate(rateConfigurationVo: RateConfigurationVo): Observable<any> {
        return this.situCmdController.deleteRateUsingGet(rateConfigurationVo.ID).pipe(
            map(x => {
              
                return x.data;
            }),
            catchError((err: any) => {
                return of(this.SetErrorHandler(err));
            })
        );
    }
    
    public GetuploadbugList(docIDNumnber: number, BlotterClientViewModel): Observable<any> {




        return this.appDataQryController.viewMessageUsingGet(docIDNumnber).pipe(

            map(x => {
                //debugger;
                return x.data;
            }),
            catchError((err: any) => {
                return of(this.SetErrorHandler(err));
                //return of(undefined);
            })

        );

    }

    public getGroupCompanyListUsingGet(): Observable<any> {
        return this.appDataQryController.getGroupCompanyListUsingGet().pipe(

            map(x => {
                //debugger;
                return x.data;
            }),
            catchError((err: any) => {
                return of(this.SetErrorHandler(err));
                //return of(undefined);
            })

        );

    }



    private SetErrorHandler(err: any): string[] {
        let errobj = err.error;
        let message: string[] = [];
        if (errobj && errobj.errors) {
            errobj.errors.forEach(x => {
                message.push(x.message);
            })
        }
        return message;
    }
}

