import { OuterClassStyle } from 'aggrid-common';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

export const VIEWPORT_HEIGHT_BLOTTER_DEFINITION_FACTORY = (deviceService: DeviceDetectorService, deviceInfo: DeviceInfo, currentDevice: string, blotterType: string, dashboardView: boolean): OuterClassStyle => {
    let viewPortHeightValue: string;
    if ((deviceService.isDesktop())) {
        /* let innerHeight: number = window.innerHeight;
         if (dashboardView) {
             viewPortHeightValue = 'calc(55.5vh)';
         }
         else if (blotterType === 'apinvoicesblotter' || 'uploadstatus') {*/
        //viewPortHeightValue = (innerHeight > 900) ? 'calc(79vh)' : 'calc(73.7vh)';
        /* }
         else {
             
         }*/
        // debugger;
        switch (blotterType) {
            case 'upload':
            case 'configuration':
            case 'configurationtaxrate':
            case 'configurationcompanytaxtemplate':

            case 'report':
                viewPortHeightValue = (innerHeight > 900) ? 'calc(79vh)' : 'calc(64.9vh)';
                break;

            case 'UplaodErrorMessage':
                viewPortHeightValue = (innerHeight > 900) ? 'calc(62vh)' : 'calc(64.9vh)';
                break;
            default:
                viewPortHeightValue = (innerHeight > 900) ? 'calc(82vh)' : 'calc(74.9vh)';
                break;
        }
    }
    return {
        OuterClassStyle: {
            height: viewPortHeightValue
        }
    }
}



export const HAMBURGERMENU_ITEM_HEIGHT_DEFINITION_FACTORY = (deviceService: DeviceDetectorService, deviceInfo: DeviceInfo): number => {
    if (deviceService.isDesktop()) {
        let innerHeight: number = window.innerHeight;
        return (innerHeight > 900) ? 60 : 65;
    } else if (deviceService.isMobile()) {
        if (deviceInfo.os === 'Android') {
            return 45;
        } else if (deviceInfo.os === 'iOS' || deviceInfo.os === 'Mac') {
            return 45;
        }
    }
}



export const VIEWPORT_HEIGHT_BLOTTERCLIENT_DEFINITION_FACTORY = (deviceService: DeviceDetectorService, deviceInfo: DeviceInfo, blotterType: string, dashboardView: boolean): OuterClassStyle => {
    let viewPortHeightValue: string;
    if (deviceService.isDesktop()) {
        if (dashboardView) {
            viewPortHeightValue = 'calc(65.6vh)';
        }
        else {
            let innerHeight = window.innerHeight;

            switch (blotterType) {


                case 'UplaodErrorMessage':
                    viewPortHeightValue = (innerHeight > 900) ? 'calc(72vh)' : 'calc(64.9vh)';
                    break;
                default:
                    viewPortHeightValue = (innerHeight > 900) ? 'calc(88vh)' : 'calc(84vh)';
                    break;
            }


        }
    } else if (deviceService.isMobile()) {
        if (deviceInfo.os === 'Android') {
            viewPortHeightValue = 'calc(75vh)';
        } else if (deviceInfo.os === 'iOS') {
            viewPortHeightValue = 'calc(73vh)';
        }
    } else if (deviceService.isTablet()) {
        if (deviceInfo.os === 'Android') {
            viewPortHeightValue = 'calc(85vh)';
        } else if (deviceInfo.os === 'iOS') {
            viewPortHeightValue = 'calc(76vh)';
        }
    }
    return {
        OuterClassStyle: {
            height: viewPortHeightValue
        }
    }
}



export const VIEWPORT_HEIGHT_BULK_UPLOAD_DEFINITION_FACTORY = (deviceService: DeviceDetectorService, deviceInfo: DeviceInfo): OuterClassStyle => {
    let viewPortHeightValue: string;
    if (deviceService.isDesktop()) {
        let innerHeight: number = window.innerHeight;
        viewPortHeightValue = (innerHeight > 900) ? 'calc(35vh)' : 'calc(30vh)';
    }
    return {
        OuterClassStyle: {
            height: viewPortHeightValue
        }
    }
}






