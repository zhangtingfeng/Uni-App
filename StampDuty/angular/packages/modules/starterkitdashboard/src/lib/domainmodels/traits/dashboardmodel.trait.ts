import { Trait } from 'shared-framework';
import { DashboardModel } from './../dashboard.model';

export class DashboardTrait extends Trait<DashboardModel> {
    constructor(target: DashboardModel) {
        super(target);
    }

    public OnActivated(): void {
        
   
    }

}