import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';
import { MenuItems } from 'adk-presentation';
import { TranslateCollection } from 'adk-shared';





export interface CarouselInterface {
    name: string;
    bgColor: string;
    title: string;
    description: string;
    btnname: string;
    icon?: IconProp;
    roles?: string[];
}

export class StarterkitRepositoryConstants {

    public static SampleRepository = 'SampleRepository';
}


export const ApplicationId = 'Starterkit';



export const MENU_ITEMS = (): MenuItems[] => {
    return [
        { id: 'upload', icon: ['fas', 'tv'], displayName: 'Upload', shortName: 'Upload' },
        { id: 'configuration', icon: ['fas', 'download'], displayName: 'Configuration', shortName: 'Configuration' },
        { id: 'report', icon: ['fas', 'clock'], displayName: 'Report', shortName: 'Report' }
    ]
}

export const SafeGuardRoutingList = [
   
]

export const CAROUSEL_ITEMS = (data: TranslateCollection): CarouselInterface[] => {
    return [
        {
            name: 'upload',
            bgColor: '#7b1fa2',
            icon: ['far', 'upload' as IconName],
            title: data.uploadStampDuty,
            description: data.uploadStampDutyDesc,
            btnname: data.view,
            roles: ['ROLE_SUPER_GST', 'ROLE_GST']
        },
        {
            name: 'configuration',
            bgColor: '#e730aa',
            icon: ['fas', 'documentgallery' as IconName],
            title: data.invoicedetails,
            description: data.invoicedetailsDesc,
            btnname: data.view,
            roles: ['ROLE_VENDOR', 'ROLE_SUPER_GST', 'ROLE_GST']
        },

        {
            name: 'report',
            bgColor: '#7b1fa2',
            icon: ['fas', 'exceldownload' as IconName],
            title: data.scanreport,
            description: data.scanreportDesc,
            btnname: data.view,
            roles: ['ROLE_SECURITY_REVIEWER']
        },
        /* {
             name: 'admin',
             bgColor: '#4dd0e1',
             icon: ['far', 'useradd' as IconName],
             title: data.admin,
             description: data.adminDesc,
             btnname: data.view,
             roles: ['ROLE_SUPER_GST']
         }*/
    ]
}


