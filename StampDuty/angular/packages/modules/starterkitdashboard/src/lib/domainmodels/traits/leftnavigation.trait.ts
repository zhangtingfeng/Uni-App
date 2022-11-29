import { Trait } from 'shared-framework';
import { LeftNavigationModel } from '../leftnavigation.model';

export class LeftNavigationTrait extends Trait<LeftNavigationModel> {

    constructor(target: LeftNavigationModel) {
        super(target);
    }

    public OnActivated(): void {

    }

}
