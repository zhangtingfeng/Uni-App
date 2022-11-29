import { Component, ElementRef, Inject, Injector, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { ActivityComponent, DisposeWith } from 'adk-shared';
import { OuterClassStyle } from 'aggrid-common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModelObjectFactory } from 'shared-framework';
import { VIEWPORT_HEIGHT_BULK_UPLOAD_DEFINITION_FACTORY } from '../../../domainmodels/constants/viewportheightdefinitionfactory.constants';
import { EditDialogModel } from '../../../domainmodels/editdialog.model';
import { EditDialogViewModel } from './editdialog.viewmodel';
import { CommonModule } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog-theme.scss'],
  providers: [EditDialogViewModel]
})
export class EditDialogComponent extends ActivityComponent<EditDialogViewModel> {
  public ViewPortHeightDefinition: OuterClassStyle;
  public UploadCloseIconSize: SizeProp;
  public FooterHeight: number;
  private MemoryinputEl: HTMLInputElement;

  @ViewChild('uploadFormFileInput', { static: false }) uploadFormFileInputRef: ElementRef;
  constructor(public container: Injector, private deviceService: DeviceDetectorService, public _dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    super(container, EditDialogViewModel);
  }

  OnInitialized(data: any): void {



    // debugger;
    //let dddd=this._dialogRef;
    super.ListenMediaChanges().pipe(DisposeWith(this)).subscribe();
    let deviceInfo = this.deviceService.getDeviceInfo();
    this.ViewPortHeightDefinition = VIEWPORT_HEIGHT_BULK_UPLOAD_DEFINITION_FACTORY(this.deviceService, deviceInfo);
    this.ViewModel.Model = ModelObjectFactory.Create(EditDialogModel, this.container);
    this.UploadCloseIconSize = (window.innerHeight > 900) ? '2x' : 'lg';
    this.ViewModel.UploadTextHeader = (window.innerHeight > 900) ? 'upload-header-desktop' : 'upload-header-laptop';
    //debugger;
    this.ViewModel.TranslationCollection.uploadDocumentHeader = this._dialogRef.componentInstance.data.DisplayName;
  }


  public EditOKclick(): void {

    this.ViewModel.ButtonActionCommand.invoke().pipe(DisposeWith(this))
      .subscribe();
    /*
  //debugger;[disabled]="!ViewModel.getClickButttonDisable()" 
  let letdocumentHeadDTO = {};

 let dddd= this.ViewModel.TaxRate;

  letdocumentHeadDTO["docType"] = this.ViewModel.TranslationCollection.uploadDocumentHeader;

  switch (this._dialogRef.componentInstance.data.ActionId) {
    case 'accountingsales_costjournaldump':
      break;
    default:
      break;
  }


  //debugger;

  switch (this._dialogRef.componentInstance.data.ActionId) {
    case 'legalentitydetails':
      break;
    default:
      break;
  }

*/

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
