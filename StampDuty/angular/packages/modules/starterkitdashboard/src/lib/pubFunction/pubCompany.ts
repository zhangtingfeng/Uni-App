import { EnumeratedItem, Helpers } from "shared-framework";



export const pubTrafiguraEntityList = (): EnumeratedItem[] => {

  

    let letsessionStoragegroupCompany = sessionStorage.getItem("Stampduty.groupCompany");
    if (Helpers.IsNotNullOrEmpty(letsessionStoragegroupCompany)) {
        return JSON.parse(letsessionStoragegroupCompany);
    }
    //   return uList;

}
