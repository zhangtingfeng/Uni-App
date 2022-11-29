import { Trait } from 'shared-framework';
import { FooterModel } from '../footer.model';

export class FooterTrait extends Trait<FooterModel> {

    constructor(target: FooterModel) {
        super(target);
    }

    public OnActivated(): void {

    }

}
