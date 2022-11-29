import { Trait } from 'shared-framework';
import { DashboardHolderModel } from '../dashboardholder.model';

export class DashboardHolderTrait extends Trait<DashboardHolderModel> {

    constructor(target: DashboardHolderModel) {
        super(target);
    }

    public OnActivated(): void {

    }

}
