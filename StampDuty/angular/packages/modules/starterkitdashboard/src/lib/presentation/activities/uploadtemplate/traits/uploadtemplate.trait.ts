import { DialogResult, DialogType } from 'adk-presentation';
import { DisposeWith } from 'adk-shared';
import { catchError, tap } from 'rxjs/operators';
import { ReactiveCommand } from 'shared-core';
import { Helpers, NavigationTriggerService, Trait } from 'shared-framework';
import { AnyElement } from 'soap/lib/wsdl/elements';
import { addEmitHelper } from 'typescript';
import { IStarterkitClientService } from '../../../../services/clientservice/istarterkit.service';
import { UploadTemplateViewModel } from './../uploadtemplate.viewmodel';

export class UploadTemplateInitializationTrait extends Trait<UploadTemplateViewModel> {
    public clientService: IStarterkitClientService;
    public ErrorMessage: string = '';
    public navigationService: NavigationTriggerService;
    constructor(target: UploadTemplateViewModel) {
        super(target);
        this.clientService = target.container.get(IStarterkitClientService);
        this.navigationService = target.Container.get(NavigationTriggerService);
    }

    public OnActivated(): void {


        this.Target.UploadTemplate = ReactiveCommand.create((file: FormData) => {
            let stringURLdddd = '';
            //debugger;
            this.Target.InProgressMessage = 'Loading...';
           
            // this.Target.Model.UploadActionID
            this.clientService.UploadTemplateUat(this.Target.Model.UploadFormDocumentFile, this.Target.Model.UploadAtionID)
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
                        try{
                            if (Array.isArray(x)) {
                                if (x.some(x => x.toLowerCase().indexOf('apinvoicesmessage') >= 0)) {
                                    this.ErrorMessage = (<string[]>x).find(x => x.toLowerCase().indexOf('apinvoicesmessage') >= 0);
                                    messageData = this.ErrorMessage.split(':')[1];
                                } else {
                                    x.forEach(x => messageData = x);
                                }
                            }
    
                        }
                        catch{
                            messageData="数据错误";
                        }

                       /// let DialogResultok = DialogResult.Close;
                       
                      //  let letdisplayIconColor = { dialogType: DialogType.Error, width: '450px', displayIcon: ['fas', 'check-circle'], displayIconColor: 'warn' };
                       
                      //  messageData = this.Target.TranslationCollection.uploadSuccessMessage;
                        //letDialogType=DialogType.Information;
                      //  DialogResultok = DialogResult.Ok;
                      //  letdisplayIconColor = { dialogType: DialogType.Information, width: '450px', displayIcon: ['fas', 'check-circle'], displayIconColor: 'warn' };


                        if (Helpers.IsNullOrEmpty(messageData)) {
                            return this.Target.Activity.DialogBox.ShowMessageBox(DialogResult.Ok, this.Target.TranslationCollection.uploadSuccessMessage, '', { dialogType: DialogType.Information, width: '450px', displayIcon: ['fas', 'check-circle'], displayIconColor: 'accent' })
                            .afterClosed().pipe(
                                DisposeWith(this)
                            ).subscribe(() => {
                             //   debugger;
                                this.Target.ClosePopup();

                            });
                        }
                        else{

                            return this.Target.Activity.DialogBox.ShowMessageBox(DialogResult.Close,messageData , '', { dialogType: DialogType.Error, width: '450px', displayIcon: ['fas', 'check-circle'], displayIconColor: 'warn' })
                            .afterClosed().pipe(
                                DisposeWith(this)
                            ).subscribe(() => {
                                //debugger;
                                this.Target.ClosePopup();

                            });
                        }
                      
                    }
                });

            return {};
        });


        this.navigationService.InProgressMessage.pipe(
            DisposeWith(this)
        )
            .subscribe(data => {
                setTimeout(() => {
                    //debugger;
                    this.Target.InProgressData = data;
                });

            });

    }

}
