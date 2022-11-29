import { Component, EventEmitter, Injector, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivityComponent, DisposeWith } from 'adk-shared';
import { CellClickedEvent, ColDef, FilterChangedEvent, RowClassParams } from 'ag-grid-community';
import { BlotterActivityComponent, BlotterComponent, BlotterOptions, GridState, OuterClassStyle } from 'aggrid-common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { tap } from 'rxjs/operators';
import { Helpers, ModelObjectFactory } from 'shared-framework';
import { BlotterClientModel } from '../../../domainmodels/blotterclient.model';
import { BlotterIntent } from '../../../domainmodels/blotterintent.interface';
import { BLOTTER_COLUMN_DEFINITION_FACTORY } from '../../../domainmodels/constants/blottercolumndefinitionfactory.constants';
import { BLOTTER_OPTION_DEFINITION_FACTORY } from '../../../domainmodels/constants/blotteroptiondefinitionfactory.constants';
import { VIEWPORT_HEIGHT_BLOTTERCLIENT_DEFINITION_FACTORY, VIEWPORT_HEIGHT_BLOTTER_DEFINITION_FACTORY } from '../../../domainmodels/constants/viewportheightdefinitionfactory.constants';
import { BlotterClientViewModel } from './blotterclient.viewmodel';
import { MatDrawer } from '@angular/material/sidenav';
import { memoryUsage } from 'process';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'blotterclient',
  templateUrl: './blotterclient.component.html',
  styleUrls: ['./blotterclient.component.scss'],
  providers: [BlotterClientViewModel],
})
export class BlotterClientComponent extends BlotterActivityComponent<BlotterClientViewModel>  {
  public BlotterOptionDefinition: BlotterOptions;
  // public GridOptionDef: GainOptions;
  public ErrorMessage: string = '';

  public ColumnDefinition: ColDef[];
  public BlotterOptionDefinition_ShowHideColumns: BlotterOptions;
  public ViewPortHeightDefinition_ShowHideColumns: OuterClassStyle;
  public BlotterOptionDefinition_Download: BlotterOptions;
  public ViewPortHeightDefinition_Download: OuterClassStyle;
  public ViewPortHeightDefinition: OuterClassStyle;
  public BlotterViewPortHeightDefinition: OuterClassStyle;
  public MasterChildDetails: string = '';
  public GridState: GridState;
  public NavigationData: any;
  public SeparatorLine: string;
  public FilterButtonFX: number = 8;
  public gstVendorBlotter: boolean;
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

  @ViewChild(BlotterComponent, { static: false })
  public blotter: BlotterComponent;


  constructor(public container: Injector, private deviceService: DeviceDetectorService,) {
    super(container, BlotterClientViewModel);

  }
  public OnInitialized(data: any, intent: BlotterIntent): void {

    //https://ag-grid.com/angular-data-grid/cell-rendering/#provided-cell-renderers 
    let deviceInfo = this.deviceService.getDeviceInfo();
    let currentDevice = deviceInfo.os;
    this.ViewModel.Model = ModelObjectFactory.Create(BlotterClientModel, this.container);
    this.ApplyDeviceStyle();
    this.NavigationData = data;
    //debugger;
    let letBlotterType = Helpers.IsNullOrEmpty(this.BlotterType) ? data.data.state : this.BlotterType;
    switch (letBlotterType) {
      case 'upload':

        break;
      case 'configuration':
        letBlotterType = 'configurationtaxrate';


        break;
      case 'report':
        /* this.ViewModel.Refresh = false;
         this.InProgressMessage = '';
         this.ViewModel.Model.BlotterRowData = [];
      */
        break;
      default: null;
    }

    this.ViewModel.BlotterType = letBlotterType;
    this.BlotterOptionDefinition = BLOTTER_OPTION_DEFINITION_FACTORY(this.ViewModel.BlotterType, data.data.blotterheading, this.ViewModel.StateData, this.ViewModel.TranslationCollection);
    this.ColumnDefinition = BLOTTER_COLUMN_DEFINITION_FACTORY(this.ViewModel.BlotterType, this.ViewModel.StateData.UserRole);
    this.BlotterViewPortHeightDefinition = VIEWPORT_HEIGHT_BLOTTER_DEFINITION_FACTORY(this.deviceService, deviceInfo, currentDevice, this.ViewModel.BlotterType, this.DashboardView);
    this.ViewPortHeightDefinition = VIEWPORT_HEIGHT_BLOTTERCLIENT_DEFINITION_FACTORY(this.deviceService, deviceInfo, this.ViewModel.BlotterType, this.DashboardView);


    this.ApplyClassStyle();
    this.ViewModel.BlotterHolderHeading = (this.DashboardView) ? this.BlotterTitle : data.data.blotterheading;
    if (letBlotterType.indexOf('configuration') > -1) this.ViewModel.BlotterHolderHeading = 'Configuration';//don't change title
    this.ViewModel.ResetStoreModel();
    this.ViewModel.GetFilterItems();

    this.gstVendorBlotter = (letBlotterType === 'report' || letBlotterType === 'upload' || letBlotterType.indexOf('configuration') > -1);



    this.ApplyAdditionalGridOption(letBlotterType);
    //debugger;
    switch (letBlotterType) {
      case 'upload':
        this.ViewModel.Model.PageCode = "SD-UP-001";
        this.ViewModel.Model.PageCodeDescription = this.ViewModel.TranslationCollection.pagecodeDescApinvoicesblotter;
        break;
      case 'configuration':


      case 'configurationtaxrate':
        ///let tdata: BlotterIntent;
        //let dbuttonaction:IButtonDetails;

        //tdata.buttonaction.Id='Addconfigurationtaxrate';
        //tdata.buttonaction.DisplayName='New'; 
        //tdata={ Id: 'Addconfigurationtaxrate', DisplayName: "New", Type: 'mat-stroked-button', Color: 'primary' };
        //this.buttonClick(tdata);
        //break;
      case 'configurationcompanytaxtemplate':
        this.ViewModel.Model.PageCode = "SD-CO-001";
        this.ViewModel.Model.PageCodeDescription = this.ViewModel.TranslationCollection.pagecodeDescApinvoicesblotter;
        break;
      case 'report':

        this.ViewModel.Model.PageCode = "SD-RE-001";
        this.ViewModel.Model.PageCodeDescription = this.ViewModel.TranslationCollection.pagecodeDescApinvoicesblotter;
        break;
      default: null;
    }

    //this.readDataAction();
  }

  public ngOnDestroy() {
    this.InProgressMessage = "";

  }

  public getContext(): any {
    return {
      formArray: null,
      createKey: this.createKey,
      baseviewmodel: this.ViewModel,
      getviewmodel: null,
      clickevent: this.clickevent
    };
  }

  public clickevent(data: any, documentName: string): void {

    let selectedIcon: string = documentName.toLowerCase();
    if (selectedIcon === 'view') {

      let dddd1111upload = this.ViewModel.clientService.Getdownloadfile(data.docID, data.fileName, this.ViewModel).pipe(
        tap(x => {
          this.InProgressMessage = 'Loading...';
        }),
        tap(() => {
          this.InProgressMessage = '';
        }),
        DisposeWith(this)
      ).subscribe(x => {


      });
    }
    else if (selectedIcon === 'messagecount') {
      //this.ViewModel.SelectedRows = data.selectedrows;
      this.ViewModel.ActionId = "ErrorMessageCount";
      this.ViewModel.DisplayName = data;//.fileName+":"+ data.docID;

      this.ViewModel.ButtonActionCommand.invoke()
        .pipe(

          DisposeWith(this)
        )
        .subscribe(_ => {
        });
    }
    else if (selectedIcon === 'delete') {
      //this.ViewModel.SelectedRows = data.selectedrows;
      this.ViewModel.ActionId = "deleteconfigration";
      this.ViewModel.SelectedRows = data;//.fileName+":"+ data.docID;
     // this.ViewModel.SelectedRows = data.selectedrows;
      this.ViewModel.ButtonActionCommand.invoke()
        .pipe(

          DisposeWith(this)
        )
        .subscribe(_ => {
        });
    }
    else if (selectedIcon === 'edit') {
      //this.ViewModel.SelectedRows = data.selectedrows;
      this.ViewModel.ActionId = "editconfigration";
      this.ViewModel.SelectedRows = data;//.fileName+":"+ data.docID;
     // this.ViewModel.SelectedRows = data.selectedrows;
      this.ViewModel.ButtonActionCommand.invoke()
        .pipe(

          DisposeWith(this)
        )
        .subscribe(_ => {
        });
    }

    
  }

  public Navigate(path: string, params?: any) {
    this.ViewModel.DispatchToActivityAsync({
      path: path,
      queryParams: params,
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Handle onchnages
  }

  public getRowNodeId_Nomination(data: any): string {
    // return "ddd";
    if (data['docID']) {
      return Helpers.IsNotNullOrEmpty(data['docID']) ? data['docID'].toString() + '.' + (Date.now() * Math.random()).toString() : '';
    }
  }


  private ApplyAdditionalGridOption(blotterType: string): void {
    this.gridOptions.onCellClicked = this.buttonEventClick;
    this.gridOptions.getRowNodeId = this.getRowNodeId_Nomination;
    this.gridOptions.context = this.getContext();
    this.BlotterOptionDefinition.GridOptions = this.gridOptions;


  }

  public OnOpenedChange(evt: boolean): void {
    this.IsOpen = evt;
    this.ViewModel.ExpandAccordion = (this.IsOpen) ? true : false;
    if (evt) {
      this.FilterButtonFX = (window.innerHeight > 900) ? 11 : 15;
    } else {
      this.FilterButtonFX = (window.innerHeight > 900) ? 8 : 10;
    }
    this.FilterIconContent = (evt) ? this.ViewModel.TranslationCollection.closefilter : this.ViewModel.TranslationCollection.searchby;

  }

  public ExpandAccordionToggle(): void {
    this.ViewModel.ExpandAccordion = !this.ViewModel.ExpandAccordion;
  }
  public PinToggle(): void {
    this.RotateDegree = (this.RotateDegree === 0) ? 90 : 0;
    this.DrawerMode = (this.RotateDegree === 0) ? 'side' : 'over';
  }
  public ToggleClick(): void {
    this.DrawerPosition = 'end';
    this.drawer.toggle();
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


  private ApplyClassStyle(): void {
    this.ViewModel.HeaderSpacing = (window.innerHeight > 900) ? '9px' : '2px';
    this.ViewModel.BlotterHolderHeader = (window.innerHeight > 900) ? 'blotterholder-header-desktop' : 'blotterholder-header-laptop';
    this.ViewModel.PanelTitle = (window.innerHeight > 900) ? 'paneltitle-desktop' : 'paneltitle-laptop';
    this.SeparatorLine = (window.innerHeight > 900) ? 'header-line-desktop' : 'header-line-laptop';
    this.ViewModel.HeaderButtonWidth = (window.innerHeight > 900) ? 8 : 10.5;
    this.FilterButtonFX = (window.innerHeight > 900) ? 8 : 10;
    this.FilterIconContent = (!this.IsOpen) ? this.ViewModel.TranslationCollection.searchby : this.ViewModel.TranslationCollection.closefilter;

  }

  public ChangeDataTableSelectedRows($event: any) {

    this.DataTableSelectedRows.emit($event);
  }

  public OnColumnStateChanged(data: GridState) {
    this.ViewModel.StateData.GridStateData.set(this.ViewModel.BlotterType, data);
  }

  public buttonEventClick(event: CellClickedEvent) {
    //debugger;
    if (event.data.messageCount > 0 && event.data.messageCount == event.value) {
      //debugger;
      let letViewModel = event.context.baseviewmodel;


      letViewModel.ActionId = "ErrorMessageCount";
      letViewModel.DisplayName = event.data;


      letViewModel.ButtonActionCommand.invoke()
        .pipe(

          DisposeWith(this)
        )
        .subscribe(_ => {
        });


    }
  }

  public buttonClick(data: BlotterIntent) {
    //debugger;

    this.ViewModel.SelectedRows = data.selectedrows;
    this.ViewModel.ActionId = data.buttonaction.Id.toLowerCase();
    this.ViewModel.DisplayName = data.buttonaction.DisplayName;


    this.ViewModel.ButtonActionCommand.invoke()
      .pipe(

        DisposeWith(this)
      )
      .subscribe(_ => {
      });
    //debugger;
    //this.ViewModel.SelectedRows = data.selectedrows;
  }


  public onFilterChanged(event: FilterChangedEvent) {
    // blotter column filter chnage
  }






  public Uploadclick() {
    debugger;

  }

  public onChangeuplaodAction(event) { }



  public ResetFilterHandler(): void {
    this.ViewModel.ResetStoreModel();
    this.drawer.toggle();
    /*this.ViewModel.ResetFilterCommand.invoke()
      .pipe(
        DisposeWith(this)
      )
      .subscribe(_ => {
      });*/
  }

  public ApplyFilterHandler(): void {
    //debugger;
    this.ViewModel.Refresh = true;
    this.drawer.toggle();
  }

  public RefreshClick(): void {
    this.ViewModel.Refresh = true;
  }


  public onTabChanged(event) {
    this.ViewModel.selectedIndex = event.index;
    let data = {};
    if (event.index == 0) {
      // this.ViewModel.BlotterType="report";
      data = { data: { state: 'configurationtaxrate', blotterheading: 'configurationtaxrate' } };
    }
    else {
      //this.ViewModel.BlotterType="report";
      data = { data: { state: 'configurationcompanytaxtemplate', blotterheading: 'configurationcompanytaxtemplate' } };
    }
    this.OnInitialized(data, null);
    this.ViewModel.Refresh = true;

    /*
        { path: 'upload', component: BlotterClientComponent,  data: { state: 'upload', blotterheading: 'Upload' }},
            { path: 'history', component: BlotterClientComponent,  data: { state: 'history', blotterheading: 'History of stamp duty' }},
            { path: 'report', component: BlotterClientComponent,  data: { state: 'report', blotterheading: 'Report' }},
   
    
    */
  }
}

