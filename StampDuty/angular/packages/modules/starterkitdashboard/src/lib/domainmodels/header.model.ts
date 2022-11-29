import { DomainModel, HasTrait } from 'shared-framework';
import { UserHeaderMenu, UserHeaderMenuData } from './constants/userheadermenu.constants';
import { HeaderTrait } from './traits/header.trait';

export interface ThemeItems {
    id: string;
    displayName: string;
    primaryColor: string;
    accentColor: string;
    warnColor: string;
    url: string
}

@HasTrait(HeaderTrait)
export class HeaderModel extends DomainModel<HeaderModel> {
    public SelectedLanguage: string;
    public UserMenuData: UserHeaderMenu[] = UserHeaderMenuData;
    public ThemeData: ThemeItems[] = [
        { id: '0', displayName: 'Pink', primaryColor: '#c2185b', accentColor: '#fbc02d', warnColor: '#e91e63', url: 'PINK-DARK-THEME' },
        { id: '1', displayName: 'Blue', primaryColor: '#1976d2', accentColor: '#e91e63', warnColor: '#f44336', url: 'BLUE-LIGHT-THEME' },
        { id: '2', displayName: 'Green', primaryColor: '#558b2f', accentColor: '#1976d2', warnColor: '#e53935', url: 'GREEN-LIGHT-THEME' },
        { id: '3', displayName: 'Cyan', primaryColor: '#0097a7', accentColor: '#388e3c', warnColor: '#d81b60', url: 'CYAN-DARK-THEME' },
        { id: '4', displayName: 'Custom', primaryColor: '#0053cf', accentColor: '#2d317c', warnColor: '#f44336', url: 'CUSTOM-THEME' },
    ];
    constructor() {
        super([
            x => x.SelectedLanguage
        ]);
    }
    OnInitialized(): void {
    }
}
