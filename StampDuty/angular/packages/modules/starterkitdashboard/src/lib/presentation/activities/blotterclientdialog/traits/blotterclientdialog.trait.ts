import { DialogResult, DialogType } from 'adk-presentation';
import { DisposeWith } from 'adk-shared';
import { combineLatest } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ReactiveCommand } from 'shared-core';
import { Helpers, NavigationTriggerService, Trait } from 'shared-framework';
import { IStarterkitClientService } from '../../../../services/clientservice/istarterkit.service';
import { DocumentInfoVo } from '../../../../services/situqueryproxy/query/ServiceTypes';
import { BlotterClientDialogViewModel } from '../blotterclientdialog.viewmodel';


export class BlotterClientDialogInitializationTrait extends Trait<BlotterClientDialogViewModel> {
    public clientService: IStarterkitClientService;
    public navigationService: NavigationTriggerService;
    constructor(target: BlotterClientDialogViewModel) {
        super(target);
        this.clientService = target.container.get(IStarterkitClientService);
        this.navigationService = target.Container.get(NavigationTriggerService);
    }

    public OnActivated(): void {



        combineLatest([this.Target.WhenPropertyChanged(x => x.BlotterType), this.Target.WhenPropertyChanged(x => x.Refresh)]).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x[0]) && x[1];
            }),
            tap(x => {
                
            }),
            switchMap(x => {
                //debugger;
              
                switch (x[0]) {
                    case 'UplaodErrorMessage':
                        let responseupload: DocumentInfoVo = {


                        };//his.Target.docID
                        
                       // debugger;
                        return this.clientService.GetuploadbugList(this.Target.data.docID, this.Target);
                        //return this.clientService.GetuploadList(responseupload, this.Target);
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
                if (Helpers.IsNotNull(x) && blotterdata.length > 0 && typeof (x[0]) !== 'string') {
                    this.Target.Model.BlotterRowData = blotterdata;
                   } else {
                    
                }


            }
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
