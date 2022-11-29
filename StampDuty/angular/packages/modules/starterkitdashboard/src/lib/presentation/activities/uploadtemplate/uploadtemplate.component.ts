import { Component, ElementRef, Inject, Injector, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { DialogResult, DialogType } from 'adk-presentation';
import { ActivityComponent, DisposeWith } from 'adk-shared';
import { OuterClassStyle } from 'aggrid-common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModelObjectFactory } from 'shared-framework';
import { UploadTemplateModel } from '../../../domainmodels/uploadtemplate.model';
import { UploadTemplateViewModel } from './uploadtemplate.viewmodel';
import { VIEWPORT_HEIGHT_BULK_UPLOAD_DEFINITION_FACTORY } from '../../../domainmodels/constants/viewportheightdefinitionfactory.constants';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'uploadtemplate',
  templateUrl: './uploadtemplate.component.html',
  styleUrls: ['./uploadtemplate.component.scss'],
  providers: [UploadTemplateViewModel]
})
export class UploadTemplateComponent extends ActivityComponent<UploadTemplateViewModel> {
  public ViewPortHeightDefinition: OuterClassStyle;
  public UploadCloseIconSize: SizeProp;
  public FooterHeight: number;
  private MemoryinputEl: HTMLInputElement;

  @ViewChild('uploadFormFileInput', { static: false }) uploadFormFileInputRef: ElementRef;
  constructor(public container: Injector, private deviceService: DeviceDetectorService, public _dialogRef: MatDialogRef<UploadTemplateComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    super(container, UploadTemplateViewModel);
  }

  OnInitialized(data: any): void {



   // debugger;
    //let dddd=this._dialogRef;
    super.ListenMediaChanges().pipe(DisposeWith(this)).subscribe();
    let deviceInfo = this.deviceService.getDeviceInfo();
    this.ViewPortHeightDefinition = VIEWPORT_HEIGHT_BULK_UPLOAD_DEFINITION_FACTORY(this.deviceService, deviceInfo);
    this.ViewModel.Model = ModelObjectFactory.Create(UploadTemplateModel, this.container);
    this.UploadCloseIconSize = (window.innerHeight > 900) ? '2x' : 'lg';
    this.ViewModel.UploadTextHeader = (window.innerHeight > 900) ? 'upload-header-desktop' : 'upload-header-laptop';
    //debugger;
    this.ViewModel.TranslationCollection.uploadDocumentHeader = this._dialogRef.componentInstance.data.DisplayName;
  }
  public UploadFormFileInputHandler(event: Event): void {
    let target = event.target as HTMLInputElement;
    let file: File = (target.files as FileList)[0];
    let inputEl: HTMLInputElement = this.uploadFormFileInputRef.nativeElement;
    this.ViewModel.Model.FileName = inputEl.files[0].name;
    if (file.size < 41943040) {
      this.ViewModel.Model.IsUploadFileChoosen = true;
      this.MemoryinputEl = inputEl;

    } else {
      this.ViewModel.Model.IsUploadFileChoosen = false;
      this.ViewModel.Activity.DialogBox.ShowMessageBox(DialogResult.Ok, this.ViewModel.TranslationCollection.fileSizeLimit, '', { dialogType: DialogType.Warning, width: '450px', displayIcon: ['fas', 'exclamation-triangle'], displayIconColor: 'warn' })
        .afterClosed().pipe(DisposeWith(this)
        )
        .subscribe(() => {
          this.ViewModel.Model.FileName = '';
        });
    }
  }



  public Uploadclick(): void {
    //debugger;
    let letdocumentHeadDTO = {};
    this.ViewModel.Model.UploadFormDocumentFile = new FormData();
    this.ViewModel.Model.UploadFormDocumentFile.append('file', this.MemoryinputEl.files[0], this.MemoryinputEl.files[0].name);
    letdocumentHeadDTO["docType"] = this.ViewModel.TranslationCollection.uploadDocumentHeader;

    switch (this._dialogRef.componentInstance.data.ActionId) {
      case 'accountingsales_costjournaldump':
        letdocumentHeadDTO["snapshotYear"] = this.ViewModel.Model.StapmeYearEntityFront;
        letdocumentHeadDTO["snapshotMonth"] = this.ViewModel.Model.StapmeMonthEntityFront;
        break;
      default:
        break;
    }


    this.ViewModel.Model.UploadAtionID = this._dialogRef.componentInstance.data.ActionId;
    //debugger;

    switch (this._dialogRef.componentInstance.data.ActionId) {
      case 'legalentitydetails':
        break;
      default:
        letdocumentHeadDTO["GroupCompanyCode"] = this.ViewModel.Model.TrafiguraEntityCodeFront;
        letdocumentHeadDTO["GroupCompanyCNName"] = this.ViewModel.Model.TrafiguraEntityFront;
        break;
    }


    const json = JSON.stringify(letdocumentHeadDTO);
    const blob = new Blob([json], { type: 'application/json' });
    this.ViewModel.Model.UploadFormDocumentFile.append('documentHeadDTO', blob);

    this.ViewModel.UploadTemplate.invoke(this.ViewModel.Model.UploadFormDocumentFile)
      .pipe(
        DisposeWith(this)
      )
      .subscribe(_ => {

      });
  }
  public ClosePopup(): void {
    //debugger;
    this.ViewModel.InProgressData = '';
    if (this._dialogRef) {
      //debugger;
      this._dialogRef.close(true);
    }
  }
}
