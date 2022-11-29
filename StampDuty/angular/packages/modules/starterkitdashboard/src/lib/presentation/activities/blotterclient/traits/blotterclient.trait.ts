import { DisposeWith } from 'adk-shared';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Helpers, Trait } from 'shared-framework';
import { BlotterClientViewModel } from '../blotterclient.viewmodel';
import { IStarterkitClientService } from '../../../../services/clientservice/istarterkit.service';
import { ReactiveCommand } from 'shared-core';
import { MatDialogConfig } from '@angular/material/dialog';
import { UploadTemplateComponent } from '../../uploadtemplate/uploadtemplate.component';
import { DialogResult, DialogType } from 'adk-presentation';
import { DocumentInfoVo, StumpDutySearchVo } from '../../../../services/situqueryproxy/query/ServiceTypes';
import { BlotterClientDialogComponent } from '../../blotterclientdialog/blotterclientdialog.component';
import { EditDialogComponent } from '../../editdialog/editdialog.component';




export class BlotterClientTrait extends Trait<BlotterClientViewModel> {

    public clientService: IStarterkitClientService;
    public filterStatus$: Observable<any>;

    constructor(target: BlotterClientViewModel) {
        super(target);
        this.clientService = target.container.get(IStarterkitClientService);

    }

    public OnActivated(): void {



        //let dddd = this.ViewModel.clientService.GetUserDetails();


        combineLatest([this.Target.WhenPropertyChanged(x => x.BlotterType), this.Target.WhenPropertyChanged(x => x.Refresh)]).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x[0]) && x[1];
            }),
            tap(x => {

            }),
            switchMap(x => {
                // debugger;

                switch (x[0]) {
                    case 'configuration':
                    case 'configurationtaxrate':

                        return this.clientService.GetRateConfigurationInfoList(this.Target);

                    case 'configurationcompanytaxtemplate':

                        return this.clientService.GetGroupCompanyList(this.Target);
                        break;

                    case 'upload':
                        let responseupload: DocumentInfoVo = {


                        };
                        return this.clientService.GetuploadList(responseupload, this.Target);
                        break;

                    case 'report':
                        //debugger;
                        let tTrafiguraEntityCodeFront = this.Target.Model.TrafiguraEntityCodeFront;
                        let tStampdutyStartYearFront = this.Target.Model.StampdutyStartYearFront;
                        let tStampdutyEndYearFront = this.Target.Model.StampdutyEndYearFront;
                        let tStampdutyStartMonthFront = this.Target.Model.StampdutyStartMonthFront;
                        let tStampdutyEndMonthFront = this.Target.Model.StampdutyEndMonthFront;
                        let tIncludeInterCompanyTradeFront = this.Target.Model.IncludeInterCompanyTradeFront === '是' ? true : false;
                        if (Helpers.IsNotNullOrEmpty(tTrafiguraEntityCodeFront)
                            && Helpers.IsNotNullOrEmpty(tStampdutyStartYearFront)
                            && Helpers.IsNotNullOrEmpty(tStampdutyEndYearFront)
                            && Helpers.IsNotNullOrEmpty(tStampdutyStartMonthFront)
                            && Helpers.IsNotNullOrEmpty(tStampdutyEndMonthFront)
                        ) {
                            let responseupload1: StumpDutySearchVo = {
                                snapshotYear_from: tStampdutyStartYearFront,
                                snapshotMonth_from: tStampdutyStartMonthFront,
                                snapshotYear_to: tStampdutyEndYearFront,
                                snapshotMonth_to: tStampdutyEndMonthFront,
                                groupCompanyCode: tTrafiguraEntityCodeFront,
                                includeInterCompanyTrade: tIncludeInterCompanyTradeFront

                            };
                            return this.clientService.GetReportList(responseupload1, this.Target);
                        }
                        else {
                            let responseupload1: StumpDutySearchVo = {
                                snapshotYear_from: "2020",
                                snapshotMonth_from: "07",
                                snapshotYear_to: "2020",
                                snapshotMonth_to: "06",
                                groupCompanyCode: "TTS",
                                includeInterCompanyTrade: true

                            };
                            return this.clientService.GetReportList(responseupload1, this.Target);
                        }
                        break;
                }

            }),
            tap(() => {

            }),
            DisposeWith(this)
        ).subscribe(x => {
            if (Helpers.IsNotNull(x)) {
                let blotterdata = (Helpers.IsNotNull(x.data)) ? x.data : x;
                this.Target.Refresh = false;
                this.Target.Model.BlotterRowData = [];
                this.Target.Model.PinnedData = [{}];
                if (Helpers.IsNotNull(x) && blotterdata.length > 0 && typeof (x[0]) !== 'string') {
                    this.Target.Model.BlotterRowData = blotterdata;
                    this.Target.Model.OffSet = this.Target.Model.BlotterRowData.length;
                    //this.Target.Model.PinnedData = (this.Target.BlotterType === 'apinvoicesblotter') ? [{ docID: x.settledAmtTotal }] : [];
                } else {
                    this.Target.Model.PinnedData = [{}];
                    if (Helpers.IsNotNull(x) && x.length > 0 && typeof (x[0]) === 'string') {
                        return this.Target.Activity.DialogBox.ShowMessageBox(DialogResult.Ok, x[0], '', { dialogType: DialogType.Information, width: '450px' });
                    }
                }

            }
        });





        this.Target.ButtonActionCommand = ReactiveCommand.create(() => {
            //debugger;
            switch (this.Target.ActionId) {
                case 'uploadtemplate':
                    break;
                case 'reportdownload':
                case 'reportdatadownload':
                    let tTrafiguraEntityCodeFront = this.Target.Model.TrafiguraEntityCodeFront;
                    let tStampdutyStartYearFront = this.Target.Model.StampdutyStartYearFront;
                    let tStampdutyEndYearFront = this.Target.Model.StampdutyEndYearFront;
                    let tStampdutyStartMonthFront = this.Target.Model.StampdutyStartMonthFront;
                    let tStampdutyEndMonthFront = this.Target.Model.StampdutyEndMonthFront;
                    let tIncludeInterCompanyTradeFront = this.Target.Model.IncludeInterCompanyTradeFront === '是' ? true : false;
                    let responseupload1: StumpDutySearchVo = {};
                    if (Helpers.IsNotNullOrEmpty(tTrafiguraEntityCodeFront)
                        && Helpers.IsNotNullOrEmpty(tStampdutyStartYearFront)
                        && Helpers.IsNotNullOrEmpty(tStampdutyEndYearFront)
                        && Helpers.IsNotNullOrEmpty(tStampdutyStartMonthFront)
                        && Helpers.IsNotNullOrEmpty(tStampdutyEndMonthFront)
                    ) {
                        responseupload1 = {
                            snapshotYear_from: tStampdutyStartYearFront,
                            snapshotMonth_from: tStampdutyStartMonthFront,
                            snapshotYear_to: tStampdutyEndYearFront,
                            snapshotMonth_to: tStampdutyEndMonthFront,
                            groupCompanyCode: tTrafiguraEntityCodeFront,
                            includeInterCompanyTrade: tIncludeInterCompanyTradeFront

                        };

                    }
                    else {
                        responseupload1 = {
                            snapshotYear_from: "2020",
                            snapshotMonth_from: "07",
                            snapshotYear_to: "2020",
                            snapshotMonth_to: "06",
                            groupCompanyCode: "TTS",
                            includeInterCompanyTrade: true

                        };
                    }
                    if (this.Target.ActionId == "reportdownload") {
                        let dddd1111upload = this.clientService.GetdownloadReportfile(responseupload1, this.Target).pipe(
                            DisposeWith(this)
                        ).subscribe(x => {


                        });
                    }
                    else if (this.Target.ActionId == "reportdatadownload") {
                        let dddd1111upload = this.clientService.GetdownloadDefaultReportfile(responseupload1, this.Target).pipe(
                            DisposeWith(this)
                        ).subscribe(x => {


                        });
                    }

                    //debugger;
                    break;
                case 'accountingsales_costjournaldump':
                case 'accountingar_ap_cpmapping':
                case 'accountingar_ap_trademapping':
                case 'legalentitydetails':

                    let dialogConfig: MatDialogConfig = this.Target.Activity.DialogBox._createConfig({ width: '45%', height: '60%' });
                    dialogConfig.data = { ActionId: this.Target.ActionId, DisplayName: this.Target.DisplayName };
                    //debugger;
                    this.Target.DialogService.open(UploadTemplateComponent, dialogConfig).afterClosed()
                        .pipe(
                            filter(x => {
                                return x;
                            }),

                            DisposeWith(this)
                        ).subscribe(() => {
                            //debugger;
                            //this.Target.Model.readDataAction();
                            let blotterType = this.Target.BlotterType;
                            this.Target.BlotterType = '';
                            this.Target.BlotterType = blotterType;
                            this.Target.Refresh = true;
                        });
                    break;
                case 'ErrorMessageCount':
                    let dialogConfig1: MatDialogConfig = this.Target.Activity.DialogBox._createConfig({ width: '85%', height: '80%' });
                    dialogConfig1.data = { ActionId: this.Target.ActionId, DisplayName: this.Target.DisplayName, state: 'UplaodErrorMessage', blotterheading: 'UplaodErrorMessage' };
                    //data: { state: 'upload', blotterheading: 'Upload' }
                    //debugger;
                    this.Target.DialogService.open(BlotterClientDialogComponent, dialogConfig1).afterClosed()
                        .pipe(
                            filter(x => {
                                return x;
                            }),

                            DisposeWith(this)
                        ).subscribe(() => {

                            let blotterType = this.Target.BlotterType;
                            this.Target.BlotterType = '';
                            this.Target.BlotterType = blotterType;
                            this.Target.Refresh = true;
                        });
                    break;
                case 'addconfigurationtaxrate':
                case 'addconfigurationcompanytaxtemplate':
                    let dialogConfig2333: MatDialogConfig = this.Target.Activity.DialogBox._createConfig({ width: '45%', height: '60%' });
                    dialogConfig2333.data = { ActionId: this.Target.ActionId, DisplayName: this.Target.DisplayName };
                    this.Target.DialogService.open(EditDialogComponent, dialogConfig2333).afterClosed()
                        .pipe(
                            filter(x => {
                                return x;
                            }),

                            DisposeWith(this)
                        ).subscribe(() => {
                            let blotterType = this.Target.BlotterType;
                            this.Target.BlotterType = '';
                            this.Target.BlotterType = blotterType;
                            this.Target.Refresh = true;
                        });
                    break;
                case 'editconfigration':
                    let dialogConfig2: MatDialogConfig = this.Target.Activity.DialogBox._createConfig({ width: '45%', height: '60%' });
                    dialogConfig2.data = { ActionId: this.Target.ActionId, DisplayName: this.Target.DisplayName };
                    this.Target.DialogService.open(EditDialogComponent, dialogConfig2).afterClosed()
                        .pipe(
                            filter(x => {
                                return x;
                            }),

                            DisposeWith(this)
                        ).subscribe(() => {
                            let blotterType = this.Target.BlotterType;
                            this.Target.BlotterType = '';
                            this.Target.BlotterType = blotterType;
                            this.Target.Refresh = true;
                        });
                    break;
                case 'deleteconfigration':
                    let dddd1111upload = this.clientService.deleteRate(this.Target.SelectedRows).pipe(
                        DisposeWith(this)
                    ).subscribe(x => {

                        this.Target.Refresh = true;
                    });
                    break;
               

                default:
                    break;
            }
            return {};
        });
    }


}

