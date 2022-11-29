import { Injectable, Injector } from '@angular/core';
import { ModelViewModel } from 'adk-shared';
import { HasTrait, ListBoxPropertyViewModel } from 'shared-framework';
import { DashboardHolderModel } from '../../../domainmodels/dashboardholder.model';
import { ApplicationState } from '../../../shared/applicationstate.service';
import { DashboardHolderInitializationTrait } from './traits/dashboardholderinitialization.trait';

@Injectable()
@HasTrait(DashboardHolderInitializationTrait)
export class DashboardHolderViewModel extends ModelViewModel<DashboardHolderModel, DashboardHolderViewModel>  {
    public InProgressData: string;
    public IsDataLoaded: boolean = false;
    public InitialRouterOutlet: ListBoxPropertyViewModel;
    constructor(public injector: Injector,public StateData: ApplicationState) {
        super(injector, []);
    }

    OnViewModelActivated(model: DashboardHolderModel): void {
        this.InitialRouterOutlet = this.List(this, x => x.InitialRouterOutletData).SetListType('INFORMATION').SetInformationPadding(false);
    }
}

