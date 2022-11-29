import { DialogResult, DialogType } from 'adk-presentation';
import { DisposeWith } from 'adk-shared';
import { catchError, tap } from 'rxjs/operators';
import { ReactiveCommand } from 'shared-core';
import { Helpers, NavigationTriggerService, Trait } from 'shared-framework';
import { AnyElement } from 'soap/lib/wsdl/elements';
import { addEmitHelper } from 'typescript';
import { IStarterkitClientService } from '../../../../services/clientservice/istarterkit.service';
import { RateConfigurationVo } from '../../../../services/uploadproxy/query/ServiceTypes';
import { EditDialogViewModel } from '../editdialog.viewmodel';


export class EditDialogInitializationTrait extends Trait<EditDialogViewModel> {
    public clientService: IStarterkitClientService;
    public ErrorMessage: string = '';
    public navigationService: NavigationTriggerService;
    constructor(target: EditDialogViewModel) {
        super(target);
        this.clientService = target.container.get(IStarterkitClientService);
        this.navigationService = target.Container.get(NavigationTriggerService);
    }

    public OnActivated(): void {





        this.navigationService.InProgressMessage.pipe(
            DisposeWith(this)
        )
            .subscribe(data => {
                setTimeout(() => {
                    //debugger;
                    this.Target.InProgressData = data;
                });

            });


        this.Target.ButtonActionCommand = ReactiveCommand.create(() => {
            //let ddddd = this.Target.Model;
            let rateConfigurationVo: RateConfigurationVo = {
                TaxableItem:this.Target.Model.rateConfigurationVo_TableTaxItem,
                Rate:this.Target.Model.rateConfigurationVo_Rate,
                DisplayCNText:this.Target.Model.rateConfigurationVo_DisplayCNText,
                ValidFrom:this.Target.Model.rateConfigurationVo_ValidFrom,
                ValidTo:this.Target.Model.rateConfigurationVo_ValidTo
            };
           
            return this.clientService.saveRate(rateConfigurationVo)
                .pipe(

                    tap((x) => {
                        //debugger;

                        this.Target.InProgressMessage = '';
                    }),
                    DisposeWith(this),

                ).
                subscribe(x => {

                    this.Target.InProgressMessage = '';
                    if (x) {
                        //debugger;
                        let messageData: string;
                        try {
                            if (Array.isArray(x)) {
                                if (x.some(x => x.toLowerCase().indexOf('apinvoicesmessage') >= 0)) {
                                    this.ErrorMessage = (<string[]>x).find(x => x.toLowerCase().indexOf('apinvoicesmessage') >= 0);
                                    messageData = this.ErrorMessage.split(':')[1];
                                } else {
                                    x.forEach(x => messageData = x);
                                }
                            }

                        }
                        catch {
                            messageData = "数据错误";
                        }


                        if (Helpers.IsNullOrEmpty(messageData)) {
                            return this.Target.Activity.DialogBox.ShowMessageBox(DialogResult.Ok, this.Target.TranslationCollection.uploadSuccessMessage, '', { dialogType: DialogType.Information, width: '450px', displayIcon: ['fas', 'check-circle'], displayIconColor: 'accent' })
                                .afterClosed().pipe(
                                    DisposeWith(this)
                                ).subscribe(() => {
                                    //   debugger;
                                    this.Target.ClosePopup();

                                });
                        }
                        else {

                            return this.Target.Activity.DialogBox.ShowMessageBox(DialogResult.Close, messageData, '', { dialogType: DialogType.Error, width: '450px', displayIcon: ['fas', 'check-circle'], displayIconColor: 'warn' })
                                .afterClosed().pipe(
                                    DisposeWith(this)
                                ).subscribe(() => {
                                    //debugger;
                                    this.Target.ClosePopup();

                                });
                        }

                    }
                });
            //return {};
    
        });
    }
}

