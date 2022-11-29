import { DisposeWith } from 'adk-shared';
import { combineLatest } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Helpers, Trait } from 'shared-framework';
import { ApplicationState } from '../../../../shared/applicationstate.service';
import { UserStateConfig, UserStateModel } from '../../../../shared/userstate.service';
import { DashboardViewModel } from '../dashboard.viewmodel';

export class DashboardInitializationTrait extends Trait<DashboardViewModel> {

    public userStateConfig: UserStateModel;
    public appState: ApplicationState;
    constructor(target: DashboardViewModel) {
        super(target);
        this.appState = target.Container.get(ApplicationState);
        this.userStateConfig = target.Container.get(UserStateConfig);
    }

    public OnActivated(): void {
        //debugger;
        this.Target.ApplyTranslation();
        /*this.Target.Model.BannerContent = {
            bannerTitle: 'this.Target.TranslationCollection.bannertitle',
            bannerDescription: 'this.Target.StateData.IsVendorUser ? this.Target.TranslationCollection.bannerDescVendor : this.Target.TranslationCollection.bannerDescGst',
            bannerImage: './assets/aplanding.jpg'
        };*/
        
      

    }



}
