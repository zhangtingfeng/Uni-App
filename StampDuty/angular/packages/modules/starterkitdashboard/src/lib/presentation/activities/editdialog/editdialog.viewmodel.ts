import { Injectable, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelViewModel } from 'adk-shared';
import { ReactiveCommand } from 'shared-core';
import { DateTimePropertyViewModel, HasTrait, Helpers, ListBoxPropertyViewModel, MultiSelectComboBoxPropertyViewModel, TextBoxPropertyViewModel } from 'shared-framework';
import { EditDialogModel } from '../../../domainmodels/editdialog.model';
import { EditDialogComponent } from './editdialog.component';
import { EditDialogInitializationTrait } from './traits/editdialog.trait';



@Injectable()
@HasTrait(EditDialogInitializationTrait)
export class EditDialogViewModel extends ModelViewModel<EditDialogModel, EditDialogViewModel>  {
    public UploadTextHeader: string;
    public EditDialogHolder: ListBoxPropertyViewModel;
    public EditDialog: ReactiveCommand<FormData, {}>;
    public TrafiguraEntity: MultiSelectComboBoxPropertyViewModel;
    public TableTaxItem: MultiSelectComboBoxPropertyViewModel;
    public TaxRate: TextBoxPropertyViewModel;
    public DisplayCNText: TextBoxPropertyViewModel;
    public StartDate: DateTimePropertyViewModel;
    public EndDate: DateTimePropertyViewModel;
    public ButtonActionCommand: ReactiveCommand<{}, {}>;

    public StapmeMonthEntity: MultiSelectComboBoxPropertyViewModel;
    public InProgressData: string;
    constructor(public injector: Injector, private _dialogRef: MatDialogRef<EditDialogComponent>) {
        super(injector, [], 'UploadDocument');
    }

    OnViewModelActivated(model: EditDialogModel): void {
        //debugger;

        switch (this._dialogRef.componentInstance.data.ActionId) {
            case 'addconfigurationtaxrate':
                this.Model.PageCode = "SD-CO-010";
                break;
            case 'addconfigurationcompanytaxtemplate':
                this.Model.PageCode = "SD-CO-011";
                break;
            
                break;
        }
       
        this.ApplyTranslation();
        this.Model.rateConfigurationVo={};
        this.Model.TranslationItems = this.TranslationCollection;
        this.EditDialogHolder = this.List(this, x => x.EditDialogHolderData).SetListType('INFORMATION').SetInformationPadding(false);
    
        this.TableTaxItem = this.MultiSelectComboBox(this, x => x.rateConfigurationVo_TableTaxItem, null, true).Label("税目");
        this.TaxRate = this.TextBox(this, x => x.rateConfigurationVo_Rate).Label("*税率0.0003");
        this.DisplayCNText = this.TextBox(this, x => x.rateConfigurationVo_DisplayCNText).Label("*税率(中文)万分之三");
        this.StartDate = this.DateTimePicker(this, x => x.rateConfigurationVo_ValidFrom).Label("起效日期(包含)*");
        this.EndDate = this.DateTimePicker(this, x => x.rateConfigurationVo_ValidTo).Label("终止日期(包含)*");
     
        /*
        public rateConfigurationVo_TableTaxItem: string;
        public rateConfigurationVo_ValidFrom: Date;
        public rateConfigurationVo_ValidTo: Date;
        public rateConfigurationVo_Rate: number;
        public rateConfigurationVo_DisplayCNText: string;
*/
    }
    public ClosePopup(): void {
        if (this._dialogRef) {
            this.InProgressData = '';
            this._dialogRef.close(true);
        }
    }

    public getClickButttonDisable(): boolean {
        // debugger;
      
        switch (this._dialogRef.componentInstance.data.ActionId) {
            case 'addconfigurationtaxrate':
                return this.Model.IsUploadFileChoosen
                    && !Helpers.IsNull(this.Model.StapmeYearEntityFront)
                    && !Helpers.IsNull(this.Model.StapmeMonthEntityFront)
                    && !Helpers.IsNull(this.Model.TrafiguraEntityFront);
            case 'addconfigurationcompanytaxtemplate':
                return this.Model.IsUploadFileChoosen
                    && !Helpers.IsNull(this.Model.TrafiguraEntityFront);
        }
    };

    public ApplyTranslation(): void {
        this.TranslationCollection = {
            StampeMonthEntity111: "Snapshot Month",
            StampeYearEntity111: "Snapshot Year",
            trafiguraEntity111: this.translate('TrafiguraEntity'),
            uploadDocumentHeader: this.translate('UploadDocumentHeader'),
            uploadSuccessMessage: this.translate('UploadSuccessMessage'),
            uploadTips: this.translate('UploadTips'),
            pagecodeDesc: this.translate('pagecodeDesc'),
            fileSizeLimit: this.translate('FileSizeLimit')
        }
    }
}

