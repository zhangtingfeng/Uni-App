import { IButtonDetails } from 'aggrid-common';

export interface BlotterIntent {
    selectedrows?: any; // specify the type instead of any
    navigationdata?: NavigationDetails;
    buttonaction?: IButtonDetails;
    additionaldata? : any;
}

export interface NavigationDetails {
    blotterheading: string;
    state: string;
    submenuof: string;
}

export interface InputCommand {
    Model: any;
    Button: IButtonDetails;
    NavigationData: NavigationDetails;
}