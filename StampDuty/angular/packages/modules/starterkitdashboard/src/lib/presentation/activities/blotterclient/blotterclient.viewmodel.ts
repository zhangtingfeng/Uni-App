import { Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
import { ModelViewModel } from 'adk-shared';
import { ReactiveCommand } from 'shared-core';
import { DateTimePropertyViewModel, EnumeratedItem, HasTrait, Helpers, MultiSelectComboBoxPropertyViewModel } from 'shared-framework';
import { addEmitHelpers } from 'typescript';
import { BlotterClientModel, FilterItems } from '../../../domainmodels/blotterclient.model';
import { SearchBoardFilter } from '../../../referencedata/store/searchfilter.state';
import { IStarterkitClientService } from '../../../services/clientservice/istarterkit.service';
import { ApplicationState } from '../../../shared/applicationstate.service';
import { BlotterClientTrait } from './traits/blotterclient.trait';

@Injectable()
@HasTrait(BlotterClientTrait)

export class BlotterClientViewModel extends ModelViewModel<BlotterClientModel> {
    [x: string]: any;
    public selectedIndex: number = 0;
    public TrafiguraEntityList: EnumeratedItem[] = [];
    public BlotterType: string;
    public SelectedRows: any;
    public clientService: IStarterkitClientService;
    public SearchFilterCommand: ReactiveCommand<{}, {}>;
    public ResetFilterCommand: ReactiveCommand<{}, {}>;
    public FilterValidInput: boolean;
    public InvoiceDateRange: DateTimePropertyViewModel;
    public ExpandAccordion: boolean = false;
    public ButtonActionCommand: ReactiveCommand<{}, {}>;
    public ActionId: string;
    public testUrlDocID: string;
    public DisplayName: string;
    public HeaderSpacing: string;
    public BlotterHolderHeader: string;
    public DialogService: MatDialog;
    public Refresh: boolean = true;
    public VendorName: MultiSelectComboBoxPropertyViewModel;
    public StampdutyStartYear: MultiSelectComboBoxPropertyViewModel;
    public StampdutyEndYear: MultiSelectComboBoxPropertyViewModel;
    public StampdutyStartMonth: MultiSelectComboBoxPropertyViewModel;
    public StampdutyEndMonth: MultiSelectComboBoxPropertyViewModel;
    public IncludeInterCompanyTrade: MultiSelectComboBoxPropertyViewModel;
    //public BlotterRowData:any[];
    public docID = null;
    constructor(public injector: Injector, public StateData: ApplicationState, private router: Router, private _route: ActivatedRoute) {

        super(injector, [
            x => x.BlotterType,
            x => x.Refresh,
        ], 'BlotterClient');
        this.clientService = injector.get(IStarterkitClientService);
        this.DialogService = this.Container.get(MatDialog);
        this.ngOnInitRoute();
    }
    ngOnInitRoute(): void {

    }
    public OnViewModelActivated(): void {
      
      
        this.ApplyTranslation();
        // this.VendorName = this.MultiSelectComboBox(this, x => x.VendorName).Label("this.TranslationCollection.vendorname").EnableVirtualScrolling(true);
        this.TrafiguraEntity = this.MultiSelectComboBox(this, x => x.TrafiguraEntity, null, true).Label(this.TranslationCollection.trafiguraEntity222);
        this.StampdutyStartYear = this.MultiSelectComboBox(this, x => x.StampdutyStartYear, null, true).Label("start year");
        this.StampdutyEndYear = this.MultiSelectComboBox(this, x => x.StampdutyEndYear, null, true).Label("end year");
        this.StampdutyStartMonth = this.MultiSelectComboBox(this, x => x.StampdutyStartMonth, null, true).Label("start month");
        this.StampdutyEndMonth = this.MultiSelectComboBox(this, x => x.StampdutyEndMonth, null, true).Label("end month");
        this.IncludeInterCompanyTrade = this.MultiSelectComboBox(this, x => x.IncludeInterCompanyTrade, null, true).Label("Include Inter Company Trade");



        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.TrafiguraEntity"))) this.TrafiguraEntity.formControl.setValue(sessionStorage.getItem("Stampduty.TrafiguraEntity"));
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.StampdutyStartYear"))) this.StampdutyStartYear.formControl.setValue(sessionStorage.getItem("Stampduty.StampdutyStartYear"));
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.StampdutyEndYear"))) this.StampdutyEndYear.formControl.setValue(sessionStorage.getItem("Stampduty.StampdutyEndYear"));
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.StampdutyStartMonth"))) this.StampdutyStartMonth.formControl.setValue(sessionStorage.getItem("Stampduty.StampdutyStartMonth"));
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.StampdutyEndMonth"))) this.StampdutyEndMonth.formControl.setValue(sessionStorage.getItem("Stampduty.StampdutyEndMonth"));
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.IncludeInterCompanyTrade"))) this.IncludeInterCompanyTrade.formControl.setValue(sessionStorage.getItem("Stampduty.IncludeInterCompanyTrade"));

        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.TrafiguraEntityCodeFront")))   this.Model.TrafiguraEntityCodeFront=sessionStorage.getItem("Stampduty.TrafiguraEntityCodeFront");
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.StampdutyStartYear")))  this.Model.StampdutyStartYearFront=sessionStorage.getItem("Stampduty.StampdutyStartYear");
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.StampdutyEndYear")))  this.Model.StampdutyEndYearFront=sessionStorage.getItem("Stampduty.StampdutyEndYear");
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.StampdutyStartMonthFront")))  this.Model.StampdutyStartMonthFront=sessionStorage.getItem("Stampduty.StampdutyStartMonthFront");
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.StampdutyStartMonthFront")))  this.Model.StampdutyEndMonthFront=sessionStorage.getItem("Stampduty.StampdutyStartMonthFront");
        if (Helpers.IsNotNullOrEmpty(sessionStorage.getItem("Stampduty.IncludeInterCompanyTradeFront"))) this.Model.IncludeInterCompanyTradeFront=sessionStorage.getItem("Stampduty.IncludeInterCompanyTradeFront");
       // debugger;

    }

    public GetFilterItems(): FilterItems {
        return this.Model.FilterPanelItems =
            { title: this.TranslationCollection.searchcriteria, type: 'formulasearch', hide: true };
    }

    public ResetStoreModel(): void {
        //debugger;
        let resetFilterItemList: SearchBoardFilter = {
            StampdutyStartYear: null,
            StampdutyEndYear: null,
            StampdutyStartMonth: null,
            StampdutyEndMonth: null,
            status: null,
            currency: null,
            vendorName: null
        };
        //this.Store$.dispatch(PutSearchBoardFilterAction(resetFilterItemList));

        this.Model.TrafiguraEntityFront = null;
        this.Model.TrafiguraEntity = null;
        this.Model.IncludeInterCompanyTrade = null;

     
        this.Model.StampdutyStartYear = null;
        this.Model.StampdutyEndYear = null;
        this.Model.StampdutyStartMonth = null;
        this.Model.StampdutyEndMonth = null;
        this.Model.Status = null;
        this.Model.Currency = null;
        this.Model.VendorName = null;
    }

    ///http://jira:8080/secure/RapidBoard.jspa?rapidView=9627&projectKey=CA&sprint=10460 
    ///http://10.193.77.234:5001/situquery/swagger-ui/index.html#/pnl-data-qry-controller/rmUsingPOST

    public ApplyTranslation(): void {
        this.TranslationCollection = {
            new: this.translate('New'),
            edit: this.translate('Edit'),
            view: 'View',
            upload: this.translate('Upload'),
            downloadTemplate: this.translate('DownloadTemplate'),
            back: this.translate('Back'),
            pagecodeDescUploadstatus: this.translate('pagecodeDescUploadstatus'),
            pagecodeDescApinvoicesblotter: this.translate('pagecodeDescApinvoicesblotter'),
            searchby: this.translate('Searchby'),
            closefilter: this.translate('CloseFilter'),
            refresh: this.translate('Refresh'),
            reset: this.translate('RESET'),
            apply: this.translate('APPLY'),
            invoicedateenderror: this.translate('InvoiceDateEndError'),
            invoicedatestarterror: this.translate('InvoiceDateStartError'),
            invoicedateinvaliderror: this.translate('InvoiceDateInvalidError'),
            invoiceduedateenderror: this.translate('InvoiceDueDateEndError'),
            invoiceduedatestarterror: this.translate('InvoiceDueDateStartError'),
            invoiceduedateinvaliderror: this.translate('InvoiceDueDateInvalidError'),
            invoicedate: this.translate('InvoiceDate'),
            invoiceduedate: this.translate('InvoiceDueDate'),
            invoicestatus: this.translate('InvoiceStatus'),
            currency: this.translate('Currency'),
            vendorname: this.translate('VendorName'),
            searchcriteria: this.translate('SearchCriteria'),
            trafiguraEntity222: this.translate('TrafiguraEntity'),
        };
    }

}
