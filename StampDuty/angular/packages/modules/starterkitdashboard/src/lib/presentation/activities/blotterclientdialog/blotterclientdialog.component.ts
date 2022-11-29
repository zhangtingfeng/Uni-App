import { Component, ElementRef, EventEmitter, Inject, Injector, Input, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { DialogResult, DialogType } from 'adk-presentation';
import { ActivityComponent, DisposeWith } from 'adk-shared';
import { BlotterOptions, GridState, OuterClassStyle } from 'aggrid-common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Helpers, ModelObjectFactory } from 'shared-framework';


import { VIEWPORT_HEIGHT_BLOTTERCLIENT_DEFINITION_FACTORY, VIEWPORT_HEIGHT_BLOTTER_DEFINITION_FACTORY, VIEWPORT_HEIGHT_BULK_UPLOAD_DEFINITION_FACTORY } from '../../../domainmodels/constants/viewportheightdefinitionfactory.constants';
import { BlotterClientDialogViewModel } from './blotterclientdialog.viewmodel';
import { MatDrawer } from '@angular/material/sidenav';
import { ColDef } from 'ag-grid-community';
import { BLOTTER_OPTION_DEFINITION_FACTORY } from '../../../domainmodels/constants/blotteroptiondefinitionfactory.constants';
import { BLOTTER_COLUMN_DEFINITION_FACTORY } from '../../../domainmodels/constants/blottercolumndefinitionfactory.constants';
import { BlotterClientDialogModel } from '../../../domainmodels/blotterclientdialog.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'BlotterClientDialog',
  templateUrl: './blotterclientdialog.component.html',
  styleUrls: ['./blotterclientdialog.component.scss'],
  providers: [BlotterClientDialogViewModel]
})
export class BlotterClientDialogComponent extends ActivityComponent<BlotterClientDialogViewModel> {
  public BlotterOptionDefinition: BlotterOptions;
  public ColumnDefinition: ColDef[];
  public ViewPortHeightDefinition: OuterClassStyle;
  public BlotterViewPortHeightDefinition: OuterClassStyle;
  public GridState: GridState;
  public NavigationData: any;
  public SeparatorLine: string;
  public FilterButtonFX: number = 8;
  public gstVendorBlotter: boolean;


  public UploadCloseIconSize: SizeProp;
  public FooterHeight: number;
  private MemoryinputEl: HTMLInputElement;
  public DrawerPosition: 'start' | 'end';
  @ViewChild('drawer', { static: false })
  public drawer: MatDrawer;
  public DrawerMode: 'over' | 'push' | 'side' = 'side';
  public IsOpen = false;
  public FilterIconContent: string = 'Close Filter';
  public FilterPanelClass: string;
  public RotateDegree: number = 0;
  public TaskId: string = null;
  @Input() BlotterType: string = '';
  @Output() DataTableSelectedRows: EventEmitter<any> = new EventEmitter();
  @Input() DashboardView: boolean;
  @Input() BlotterTitle: string;


  @ViewChild('uploadFormFileInput', { static: false }) uploadFormFileInputRef: ElementRef;
  constructor(public container: Injector, private deviceService: DeviceDetectorService, public _dialogRef: MatDialogRef<BlotterClientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    super(container, BlotterClientDialogViewModel);
  }

  OnInitialized(): void {



    //debugger;
    //let dddd=this._dialogRef;
    super.ListenMediaChanges().pipe(DisposeWith(this)).subscribe();
    let deviceInfo = this.deviceService.getDeviceInfo();
    let currentDevice = deviceInfo.os;
    //debugger;
    this.ViewModel.Model = ModelObjectFactory.Create(BlotterClientDialogModel, this.container);
    let data = this._dialogRef.componentInstance;
    this.ApplyDeviceStyle();
    this.NavigationData = data;

    let letBlotterType=Helpers.IsNullOrEmpty(this.BlotterType) ? data.data.state : this.BlotterType;
    
     //debugger; 
    this.ViewModel.BlotterType = letBlotterType;
    this.BlotterOptionDefinition = BLOTTER_OPTION_DEFINITION_FACTORY(this.ViewModel.BlotterType, data.data.blotterheading, this.ViewModel.StateData, this.ViewModel.TranslationCollection);
    this.ColumnDefinition = BLOTTER_COLUMN_DEFINITION_FACTORY(this.ViewModel.BlotterType, this.ViewModel.StateData.UserRole);
    this.BlotterViewPortHeightDefinition = VIEWPORT_HEIGHT_BLOTTER_DEFINITION_FACTORY(this.deviceService, deviceInfo, currentDevice, this.ViewModel.BlotterType, this.DashboardView);
    this.ViewPortHeightDefinition = VIEWPORT_HEIGHT_BLOTTERCLIENT_DEFINITION_FACTORY(this.deviceService, deviceInfo, this.ViewModel.BlotterType,this.DashboardView);
    
    //this.ViewModel.ResetStoreModel();
    this.ApplyClassStyle();

    this.UploadCloseIconSize = (window.innerHeight > 900) ? '2x' : 'lg';
    this.ViewModel.UploadTextHeader = (window.innerHeight > 900) ? 'upload-header-desktop' : 'upload-header-laptop';
    //debugger;
    this.ViewModel.data = this._dialogRef.componentInstance.data.DisplayName;
    this.ViewModel.TranslationCollection.uploadDocumentHeader = this._dialogRef.componentInstance.data.DisplayName.fileName + ":" + this._dialogRef.componentInstance.data.DisplayName.docID;
    this.ViewModel.Refresh = true;
    // debugger;

   this.gstVendorBlotter=true;

   this.gstVendorBlotter=true;


  }
  
  public OnColumnStateChanged(data: GridState) {
    this.ViewModel.StateData.GridStateData.set(this.ViewModel.BlotterType, data);
  }

  public ClosePopup(): void {
    //debugger;
    this.ViewModel.InProgressData = '';
    if (this._dialogRef) {
      //debugger;
      this._dialogRef.close(true);
    }
  }

  private ApplyClassStyle(): void {
    this.ViewModel.HeaderSpacing = (window.innerHeight > 900) ? '9px' : '2px';
    this.ViewModel.BlotterHolderHeader = (window.innerHeight > 900) ? 'blotterholder-header-desktop' : 'blotterholder-header-laptop';
    this.ViewModel.PanelTitle = (window.innerHeight > 900) ? 'paneltitle-desktop' : 'paneltitle-laptop';
    this.SeparatorLine = (window.innerHeight > 900) ? 'header-line-desktop' : 'header-line-laptop';
    this.ViewModel.HeaderButtonWidth = (window.innerHeight > 900) ? 8 : 10.5;
    this.FilterButtonFX = (window.innerHeight > 900) ? 8 : 10;
    this.FilterIconContent = (!this.IsOpen) ? this.ViewModel.TranslationCollection.searchby : this.ViewModel.TranslationCollection.closefilter;
  }

  private ApplyDeviceStyle(): void {
    if (this.deviceService.isMobile()) {
      this.DrawerMode = 'over';
      this.FilterPanelClass = 'filterpanel_mobile';
    } else if (this.deviceService.isTablet()) {
      this.DrawerMode = 'over';
      this.FilterPanelClass = 'filterpanel_tablet';
    } else {
      this.FilterPanelClass = 'filterpanel_desktop';
    }
  }

}
