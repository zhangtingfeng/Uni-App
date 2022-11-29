import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface UserHeaderMenu {
    buttonName: string,
    navigationUrl: string,
    icon: IconProp,
}

export const UserHeaderMenuData: UserHeaderMenu[] = [
    {
        buttonName: 'Dashboard',
        navigationUrl: 'home',
        icon: ['fas','tv']
    },
    {
        buttonName: 'My Profile',
        navigationUrl: 'myprofile',
        icon: ['far','user']

    },
    {
        buttonName: 'Logout',
        navigationUrl: 'exit',
        icon: ['fas', 'power-off']

    }
];
    
export class RepositoryConstant  {
    public static ApinvoiceCompaniesRepository = '';
}