import { Injector, NgModule } from '@angular/core';
import { ActivityModule } from 'adk-shared';
import { RoutingGuardService } from './routeguard';
import { IStarterkitClientService } from './services/clientservice/istarterkit.service';
import { StarterkitClientService } from './services/clientservice/starterkit.service';
import { AppDataQryController } from './services/situqueryproxy/query/AppDataQryController';
import { AppDownloadDataQryController } from './services/situqueryproxy/query/AppDownloadDataQryController';
import { IAppDataQryController } from './services/situqueryproxy/query/IAppDataQryController';
import { IAppDownloadDataQryController } from './services/situqueryproxy/query/IAppDownloadDataQryController';
import { ISituCmdController } from './services/uploadproxy/query/ISituCmdController';
import { SituCmdController } from './services/uploadproxy/query/SituCmdController';
import { ApplicationState } from './shared/applicationstate.service';
import { UserState, UserStateConfig } from './shared/userstate.service';
import { StarterkitDashboardRoutingModule } from './starterkitdashboard-routing';


@NgModule({
    declarations: [

    ],
    imports: [
        StarterkitDashboardRoutingModule,
    ],
    exports: [],
    providers: [
        RoutingGuardService,
        { provide: UserStateConfig, useValue: UserState },
        { provide: IStarterkitClientService, useClass: StarterkitClientService },
        { provide: IAppDataQryController, useClass: AppDataQryController },
        { provide: IAppDownloadDataQryController, useClass: AppDownloadDataQryController },
        { provide: ISituCmdController, useClass: SituCmdController },
        ApplicationState,
    ],
    entryComponents: []
})


export class StarterkitDashboardModule extends ActivityModule {
    constructor(public injector: Injector) {
        super('StarterkitModule', injector);
    }

    public OnInitializingCaches() {

    }

    public OnInitializingCoreServices() {


        // this.RegisterServiceClient<IAppDataQryController>('SituQueryModulegeneration_IAppDataQryController', 'service.reportgeneration.query', '', '');
        //this.RegisterServiceClient<IAppDataQryController>('SituQueryModuledown_IAppDataQryController', 'service.situquery.query', '', '');
        this.RegisterServiceClient<IAppDataQryController>('SituQueryModule_IAppDataQryController', 'service.situquery.query', '', '');
        this.RegisterServiceClient<IAppDataQryController>('SituQueryModule_IAppDownloadDataQryController', 'service.situquery.query', '', '');
        this.RegisterServiceClient<ISituCmdController>('UploadModule_ISituCmdController', 'service.upload.query', '', '');


    }

    public OnRegisteringTypes() {

    }

    public registerRepository(repositoryName: string, actionName: any, getAllSelector: any, selector: any) {

    }

}