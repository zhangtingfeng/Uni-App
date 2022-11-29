import { TranslateCollection } from 'adk-shared';
import { BlotterOptions, DeviceState } from 'aggrid-common';
import { Helpers } from 'shared-framework';
import { ApplicationState } from '../../shared/applicationstate.service';
import { BLOTTER_BUTTON_FACTORY } from './blotterbuttonfactory.constants';




export const BLOTTER_OPTION_DEFINITION_FACTORY = (blotterType: string, blotterHeading: string, appState: ApplicationState, translateData: TranslateCollection): BlotterOptions => {
    let returnValue: BlotterOptions;
    //debugger;
    switch (blotterType) {
        case 'upload':

        case 'UplaodErrorMessage':
        case 'configuration':
        case 'configurationtaxrate':
        case 'configurationcompanytaxtemplate':
        case 'report':
            {
                returnValue = {
                    BlotterType: blotterType,
                    HeadingText: '',//Helpers.IsNotNullOrEmpty(blotterHeading) ? blotterHeading :
                    ShowHideColumns: true,
                    ShowDownloadIcon: blotterType == 'report' ? DeviceState.None : DeviceState.Desktop,
                    ShowBlotterInMobile: true,
                    ShowLoadMoreButton: false,
                    ShowItourIcon: false,
                    RowSelection: 'multiple',
                    ShowTotalTonnage: false,
                    LabelingContent: '',
                    IsBlotterInsideTab: false,
                    ShowButtonHolderTopLine: true,
                    HideColumnsDecoratorValue: 19,
                    Buttons: BLOTTER_BUTTON_FACTORY(blotterType, appState, translateData),
                    IsMasterDetails: false,
                    MasterChildDetails: '',


                }
            }
            break;


    }
    return returnValue;
}
