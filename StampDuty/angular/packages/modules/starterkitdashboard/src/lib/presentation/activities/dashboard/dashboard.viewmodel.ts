import { Injectable, Injector, ViewChild } from '@angular/core';
import { ModelViewModel } from 'adk-shared';
import { HasTrait } from 'shared-framework';
import { DashboardModel } from '../../../domainmodels/dashboard.model';
import { IStarterkitClientService } from '../../../services/clientservice/istarterkit.service';
import { DashboardInitializationTrait } from './traits/dashboardinitialization.traits';

@Injectable()
@HasTrait(DashboardInitializationTrait)
export class DashboardViewModel extends ModelViewModel<DashboardModel, DashboardViewModel>  {
    [x: string]: any;

    public clientService: IStarterkitClientService;
   


    constructor(public injector: Injector) {
        super(injector, [], 'Dashboard');
        this.clientService = injector.get(IStarterkitClientService);
        // this.clientService = ;
    }

    
   

    OnViewModelActivated(model: DashboardModel): void {
        
    }


    public ApplyTranslation(): void {
        this.TranslationCollection = {
            invoicedashboard: this.translate('invoicedashboard'),
            invoicedetails: this.translate('invoicedetails'),
            uploadstatus: this.translate('uploadstatus'),
            uploadStampDuty: this.translate('uploadStampDuty'),
            uploadStampDutyDesc: this.translate('uploadStampDutyDesc'),
            scanreport: this.translate('scanreport'),
            admin: this.translate('admin'),
            invoicedashboardDesc: this.translate('invoicedashboardDesc'),
            invoicedetailsDesc: this.translate('invoicedetailsDesc'),


            uploadstatusDesc: this.translate('uploadstatusDesc'),
            scanreportDesc: this.translate('scanreportDesc'),
            adminDesc: this.translate('adminDesc'),
            view: this.translate('view'),
            bannertitle: this.translate('bannertitle'),
            bannerDescVendor: this.translate('bannerDescVendor'),
            bannerDescGst: this.translate('bannerDescGst'),
            menutitle: this.translate('menutitle'),
            pagecodeDesc: this.translate('pagecodeDesc'),
            searchby: this.translate('Searchby'),
            closefilter: this.translate('CloseFilter'),
            refresh: this.translate('Refresh'),
            reset: this.translate('RESET'),
            apply: this.translate('APPLY'),

        }
    }


}