import { DomainModel, MetaData } from 'shared-framework';
import { DashboardHolderMetaData } from './metadata/dashboardholder.metadata';

@MetaData(DashboardHolderMetaData)
export class DashboardHolderModel extends DomainModel<DashboardHolderModel> {
  
    public InitialRouterOutletData = [{
        headingName: 'Initial Router Outlet Setup'
    }];

    constructor() {
        super([
           x => x.InitialRouterOutletData
        ]);
    }

    OnInitialized(): void {

    }
}
