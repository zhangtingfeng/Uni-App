import { Trait } from 'shared-framework';
import { FooterViewModel } from '../footer.viewmodel';


export class FooterInitializationTrait extends Trait<FooterViewModel> {

    constructor(target: FooterViewModel) {
        super(target);
    }

    public OnActivated(): void {

    }

}
