import { EntityActionFactory, EntityServices } from '@ngrx/data';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { EnumeratedItem, Helpers, Trait } from 'shared-framework';
import { pubTrafiguraEntityList } from '../../pubFunction/pubCompany';
import { ApplicationState } from '../../shared/applicationstate.service';
import { BlotterClientDialogModel } from '../blotterclientdialog.model';



export class BlotterClientDialogChangeTrait extends Trait<BlotterClientDialogModel> {
    public entityServices: EntityServices;
    public entityActionFactory: EntityActionFactory;
    public IsLoaded: boolean = false;
    constructor(target: BlotterClientDialogModel, public StateData: ApplicationState) {
        super(target);
        this.entityServices = target.Container.get(EntityServices);
        this.entityActionFactory = target.Container.get(EntityActionFactory);
    }

    public OnActivated(): void {
        ///curl -vvv --proxy http://10.193.67.20:8080 -X GET pro.qcc.com/apixy=http://10.193.67.20:8080 -X GET pro.qcc.com/api 
        // curl -vvv 52.81.236.118
      
      

    }
}
