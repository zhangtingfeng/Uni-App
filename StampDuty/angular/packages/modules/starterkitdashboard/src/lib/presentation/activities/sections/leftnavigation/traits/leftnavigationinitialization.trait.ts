import { MenuItems } from 'adk-presentation';
import { DisposeWith } from 'adk-shared';
import { map } from 'rxjs/operators';
import { ITranslationService, Trait } from 'shared-framework';
import { ApplicationState } from '../../../../../shared/applicationstate.service';
import { UserStateConfig, UserStateModel } from '../../../../../shared/userstate.service';
import { MENU_ITEMS } from '../../../../../starterkitdashboard.constants';
import { LeftNavigationViewModel } from '../leftnavigation.viewmodel';

export class LeftNavigationInitializationTrait extends Trait<LeftNavigationViewModel> {

    public userStateConfig: UserStateModel;
    public appState: ApplicationState;
    public translationservice: ITranslationService;
    constructor(target: LeftNavigationViewModel) {
        super(target);
        this.userStateConfig = target.Container.get(UserStateConfig);
        this.appState = target.container.get(ApplicationState);
        this.translationservice = target.container.get(ITranslationService, null);
    }

    public OnActivated(): void {
        this.Target.WhenNewModel()
            .pipe(
                map(x => {
                    return x;
                }),
                DisposeWith(this)
            )
            .subscribe(x => {
                this.Target.Model.MenuItemsObj = this.getMenuItems();
            })
    }

    private getMenuItems(): MenuItems[] {
        return MENU_ITEMS();
    }

}
