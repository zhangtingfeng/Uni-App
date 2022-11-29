import { Injectable, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelViewModel } from 'adk-shared';
import { ReactiveCommand } from 'shared-core';
import { HasTrait, Helpers, ListBoxPropertyViewModel, MultiSelectComboBoxPropertyViewModel, TextBoxPropertyViewModel } from 'shared-framework';
import { BlotterClientDialogModel } from '../../../domainmodels/blotterclientdialog.model';


import { ApplicationState } from '../../../shared/applicationstate.service';

import { BlotterClientDialogComponent } from './blotterclientdialog.component';
import { BlotterClientDialogInitializationTrait } from './traits/blotterclientdialog.trait';


@Injectable()
@HasTrait(BlotterClientDialogInitializationTrait)
export class BlotterClientDialogViewModel extends ModelViewModel<BlotterClientDialogModel, BlotterClientDialogViewModel>  {
    public BlotterType: string;
  
    public HeaderSpacing: string;
    public ExpandAccordion: boolean = false;
    public data = null;
    public Status: MultiSelectComboBoxPropertyViewModel;
    public Currency: MultiSelectComboBoxPropertyViewModel;
    public VendorName: MultiSelectComboBoxPropertyViewModel;
    public SearchFilterCommand: ReactiveCommand<{}, {}>;
    public ResetFilterCommand: ReactiveCommand<{}, {}>;
    public FilterValidInput: boolean;
    public BlotterHolderHeader: string;
    public BlotterHolderHeading: string;
    public HeaderButtonWidth: number;
    public PanelTitle: string;
    public IsDashboardView: boolean = false;
    public Refresh: boolean = false;
    public ButtonActionCommand: ReactiveCommand<{}, {}>;
    public ActionId: string;
    public UploadTextHeader: string;
    public UploadTemplateHolder: ListBoxPropertyViewModel;
    public FileName: TextBoxPropertyViewModel;
    public UploadTemplate: ReactiveCommand<FormData, {}>;
    public TrafiguraEntity: MultiSelectComboBoxPropertyViewModel;
    public StapmeYearEntity: MultiSelectComboBoxPropertyViewModel;
    public StapmeMonthEntity: MultiSelectComboBoxPropertyViewModel;
    public InProgressData: string;
    constructor(public injector: Injector, private _dialogRef: MatDialogRef<BlotterClientDialogComponent>,public StateData: ApplicationState) {
        super(injector, [x => x.BlotterType,
            x => x.Refresh], 'UploadDocument');
    }
 
    OnViewModelActivated(model: BlotterClientDialogModel): void {
        //debugger;
        this.Model.PageCode = "APP-BU-004";
        this.ApplyTranslation();
        this.Model.TranslationItems = this.TranslationCollection;
        this.UploadTemplateHolder = this.List(this, x => x.UploadTemplateHolderData).SetListType('INFORMATION').SetInformationPadding(false);
      

      
    }
    public ClosePopup(): void {
        if (this._dialogRef) {
            this.InProgressData = '';
            this._dialogRef.close(true);
        }
    }


  

    public ApplyTranslation(): void {
        this.TranslationCollection = {
            StampeMonthEntity111: "Snapshot Month",
            StampeYearEntity111: "Snapshot Year",
            trafiguraEntity111: this.translate('TrafiguraEntity'),
            uploadDocumentHeader: this.translate('UploadDocumentHeader'),
            uploadSuccessMessage: this.translate('UploadSuccessMessage'),
            uploadTips: this.translate('UploadTips'),
            pagecodeDesc: this.translate('pagecodeDesc'),
            fileSizeLimit: this.translate('FileSizeLimit'),
            new: this.translate('New'),
            edit: this.translate('Edit'),
            view: this.translate('View'),
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
            searchcriteria: this.translate('SearchCriteria')
        }
    }
}

