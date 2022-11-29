import { EntityActionFactory, EntityServices } from '@ngrx/data';
import { DisposeWith } from 'adk-shared';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { EnumeratedItem, Helpers, Trait } from 'shared-framework';

import { ApplicationState } from '../../shared/applicationstate.service';
import { EditDialogModel } from '../editdialog.model';



export class EditDialogChangeTrait extends Trait<EditDialogModel> {
    public entityServices: EntityServices;
    public entityActionFactory: EntityActionFactory;
    public IsLoaded: boolean = false;
    constructor(target: EditDialogModel, public StateData: ApplicationState) {
        super(target);
        this.entityServices = target.Container.get(EntityServices);
        this.entityActionFactory = target.Container.get(EntityActionFactory);
    }

    public OnActivated(): void {
        ///curl -vvv --proxy http://10.193.67.20:8080 -X GET pro.qcc.com/apixy=http://10.193.67.20:8080 -X GET pro.qcc.com/api 
        // curl -vvv 52.81.236.118
        let tableTaxItemList = [];
        tableTaxItemList.push({ Identifier: "买卖合同", Code: "买卖合同", Description: "买卖合同" });
        this.Target.TableTaxItemList = tableTaxItemList;
/*
        this.Target.WhenPropertyChanged(x => x.rateConfigurationVo_TableTaxItem).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {
            let type: any = this.Target.TableTaxItemList.find(type => type.Description === resp);
            this.Target.rateConfigurationVo.TaxableItem = type.Code;
           // debugger;
        });*/

    }






}
