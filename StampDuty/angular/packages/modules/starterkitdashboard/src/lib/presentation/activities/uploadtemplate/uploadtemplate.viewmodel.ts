import { Injectable, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelViewModel } from 'adk-shared';
import { ReactiveCommand } from 'shared-core';
import { HasTrait, Helpers, ListBoxPropertyViewModel, MultiSelectComboBoxPropertyViewModel, TextBoxPropertyViewModel } from 'shared-framework';
import { UploadTemplateModel } from '../../../domainmodels/uploadtemplate.model';
import { UploadTemplateInitializationTrait } from './traits/uploadtemplate.trait';
import { UploadTemplateComponent } from './uploadtemplate.component';

@Injectable()
@HasTrait(UploadTemplateInitializationTrait)
export class UploadTemplateViewModel extends ModelViewModel<UploadTemplateModel, UploadTemplateViewModel>  {
    public UploadTextHeader: string;
    public UploadTemplateHolder: ListBoxPropertyViewModel;
    public FileName: TextBoxPropertyViewModel;
    public UploadTemplate: ReactiveCommand<FormData, {}>;
    public TrafiguraEntity: MultiSelectComboBoxPropertyViewModel;
    public StapmeYearEntity: MultiSelectComboBoxPropertyViewModel;
    public StapmeMonthEntity: MultiSelectComboBoxPropertyViewModel;
    public InProgressData: string;
    constructor(public injector: Injector, private _dialogRef: MatDialogRef<UploadTemplateComponent>) {
        super(injector, [], 'UploadDocument');
    }

    OnViewModelActivated(model: UploadTemplateModel): void {
        //debugger;

        switch (this._dialogRef.componentInstance.data.ActionId) {
            case 'accountingsales_costjournaldump':
                this.Model.PageCode = "SD-UP-010";
                break;
            case 'accountingar_ap_cpmapping':
                this.Model.PageCode = "SD-UP-011";
                break;
            case 'accountingar_ap_trademapping':
                this.Model.PageCode = "SD-UP-012";
                break;
            case 'legalentitydetails':
                this.Model.PageCode = "SD-UP-013";
                break;
        }
       
        this.ApplyTranslation();
        this.Model.TranslationItems = this.TranslationCollection;
        this.UploadTemplateHolder = this.List(this, x => x.UploadTemplateHolderData).SetListType('INFORMATION').SetInformationPadding(false);
        this.FileName = this.TextBox(this, x => x.FileName).Label('');
        //debugger;

        this.TrafiguraEntity = this.MultiSelectComboBox(this, x => x.TrafiguraEntity, null, true).Label(this.TranslationCollection.trafiguraEntity111);
        this.StapmeYearEntity = this.MultiSelectComboBox(this, x => x.StapmeYearEntity, null, true).Label(this.TranslationCollection.StampeYearEntity111);
        this.StapmeMonthEntity = this.MultiSelectComboBox(this, x => x.StapmeMonthEntity, null, true).Label(this.TranslationCollection.StampeMonthEntity111);

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
            case 'accountingsales_costjournaldump':
                return this.Model.IsUploadFileChoosen
                    && !Helpers.IsNull(this.Model.StapmeYearEntityFront)
                    && !Helpers.IsNull(this.Model.StapmeMonthEntityFront)
                    && !Helpers.IsNull(this.Model.TrafiguraEntityFront);
                break;
            case 'accountingar_ap_cpmapping':
            case 'accountingar_ap_trademapping':
                return this.Model.IsUploadFileChoosen
                    && !Helpers.IsNull(this.Model.TrafiguraEntityFront);
                break;
            case 'legalentitydetails':
                return this.Model.IsUploadFileChoosen;
                break;
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

