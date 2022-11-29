import { TranslateCollection } from 'adk-shared';
import { IButtonDetails } from 'aggrid-common';
import { Helpers } from 'shared-framework';


export const EDITOR_BUTTON_FACTORY = (data: TranslateCollection): IButtonDetails[] => {
    return [
        {
            Id: 'back', DisplayName: 'Back', Type: 'mat-stroked-button', Color: 'primary', NavigateUrl: ''
        },
        {
            Id: 'cancel', DisplayName: 'Cancel', Type: 'mat-stroked-button', Color: 'primary', NavigateUrl: ''
        },
        {
            Id: 'saveasdraft', DisplayName: 'Save', Type: 'mat-stroked-button', Color: 'primary', NavigateUrl: ''
        },
        {
            Id: 'submit', DisplayName: 'Submit', Type: 'mat-raised-button', Color: 'primary', NavigateUrl: ''
        }
    ]


}