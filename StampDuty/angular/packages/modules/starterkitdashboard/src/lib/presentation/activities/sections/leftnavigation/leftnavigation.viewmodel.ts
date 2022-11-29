import { Injectable, Injector } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ModelViewModel } from 'adk-shared';
import { HasTrait } from 'shared-framework';
import { LeftNavigationModel } from '../../../../domainmodels/leftnavigation.model';
import { LeftNavigationInitializationTrait } from './traits/leftnavigationinitialization.trait';


@Injectable()
@HasTrait(LeftNavigationInitializationTrait)
export class LeftNavigationViewModel extends ModelViewModel<LeftNavigationModel, LeftNavigationViewModel>  {

    public ExpandedIcon: IconProp = ['fas', 'angle-down'];
    public CollapseIcon: IconProp = ['fas', 'angle-right'];
    public FlexWidth: number = 10;
    public IsIconView: boolean = false;
    public MenuItemHeight: number = 45;
    public IsEliteView: boolean = false;
    public TrafiguraLogo: string = '/assets/traflogo_white.svg';
    public ChildrenAsMenu: boolean = false;
    
    constructor(public injector: Injector) {
        super(injector, [

        ], 'LeftNavigation');
    }
    OnViewModelActivated(model: LeftNavigationModel): void {
    }
}

