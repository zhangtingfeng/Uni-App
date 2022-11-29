import { TranslateCollection } from 'adk-shared';
import { IButtonDetails } from 'aggrid-common';
import { Helpers } from 'shared-framework';
import { BlotterClientViewModel } from '../../presentation/activities/blotterclient/blotterclient.viewmodel';
import { ApplicationState } from '../../shared/applicationstate.service';

export const BLOTTER_BUTTON_FACTORY = (blotterType: string, appState: ApplicationState, translateData: TranslateCollection): IButtonDetails[] => {
    switch (blotterType) {

        case 'upload':

            {
                return [
                    {
                        Id: 'AccountingSales_CostJournalDump', DisplayName: "Sales/Cost Journal Dump", Type: 'mat-stroked-button', Color: 'primary',
                        VisibilityFunc: (viewModel: BlotterClientViewModel) => {
                            return true;
                        },
                        EnabledFunc: (rows) => {
                            return true;
                        }
                    },
                    {
                        Id: 'AccountingAR_AP_CPMapping', DisplayName: "AR/AP - CP Mapping", Type: 'mat-stroked-button', Color: 'primary',
                        VisibilityFunc: (viewModel: BlotterClientViewModel) => {
                            return true;
                        },
                        EnabledFunc: (rows) => {
                            return true;
                        }
                    },


                    {
                        Id: 'AccountingAR_AP_TradeMapping', DisplayName: "Trade - AR/AP Mapping", Type: 'mat-stroked-button', Color: 'primary',
                        VisibilityFunc: (viewModel: BlotterClientViewModel) => {
                            return true;
                        },
                        EnabledFunc: (rows) => {
                            return true;
                        }
                    },
                    {
                        Id: 'LegalEntityDetails', DisplayName: "Legal Entity Details", Type: 'mat-stroked-button', Color: 'primary',
                        VisibilityFunc: (viewModel: BlotterClientViewModel) => {
                            return true;
                        },
                        EnabledFunc: (rows) => {
                            return true;
                        }
                    }

                ]
            }
        case 'configuration':
        case 'configurationtaxrate':
            {
                return [
                    {
                        Id: 'Addconfigurationtaxrate', DisplayName: "New", Type: 'mat-stroked-button', Color: 'primary',
                        VisibilityFunc: (viewModel: BlotterClientViewModel) => {
                            return true;
                        },
                        EnabledFunc: (rows) => {
                            return true;
                        }
                    }


                ]
            }
        case 'configurationcompanytaxtemplate':
            {
                return [
                    {
                        Id: 'Addconfigurationcompanytaxtemplate', DisplayName: "New", Type: 'mat-stroked-button', Color: 'primary',
                        VisibilityFunc: (viewModel: BlotterClientViewModel) => {
                            return true;
                        },
                        EnabledFunc: (rows) => {
                            return true;
                        }
                    }


                ]
            }
            break;
        case 'report':

            {
                return [
                    {
                        Id: 'reportdownload', DisplayName: "税务局模板", Type: 'mat-stroked-button', Color: 'primary',
                        VisibilityFunc: (viewModel: BlotterClientViewModel) => {
                            return true;
                        },
                        EnabledFunc: (rows) => {
                            return true;
                        }
                    },
                    {
                        Id: 'reportdatadownload', DisplayName: "数据下载", Type: 'mat-stroked-button', Color: 'primary',
                        VisibilityFunc: (viewModel: BlotterClientViewModel) => {
                            return true;
                        },
                        EnabledFunc: (rows) => {
                            return true;
                        }
                    }

                ]
            }


    }
}




