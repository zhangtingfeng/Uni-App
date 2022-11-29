import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { DomainModel, HasTrait } from 'shared-framework';
import { LeftNavigationTrait } from './traits/leftnavigation.trait';

export interface ToggleButtonItem {
    name: string;
    icon?: IconProp;
    iconSize?: SizeProp;
    value: string;
}

@HasTrait(LeftNavigationTrait)
export class LeftNavigationModel extends DomainModel<LeftNavigationModel> {

    public MenuItemsObj: any[] = [];
    public ToggleButtonItem: ToggleButtonItem[] = [
        {
            name: 'Icon', icon: ['fas', 'mobile-alt'], iconSize: 'lg', value: 'iconic'
        },
        {
            name: 'Elite', icon: ['fas', 'star'], iconSize: 'lg', value: 'elite'
        },
        {
            name: 'List', icon: ['fas', 'th-list'], iconSize: 'lg', value: 'list'
        }
    ];

    constructor() {
        super([
            x => x.MenuItemsObj,
            x => x.ToggleButtonItem
        ]);
    }

    OnInitialized(): void {

    }
}
