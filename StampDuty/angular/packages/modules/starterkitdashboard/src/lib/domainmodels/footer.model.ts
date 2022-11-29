import { DomainModel, HasTrait } from 'shared-framework';
import { FooterTrait } from './traits/footer.trait';


@HasTrait(FooterTrait)
export class FooterModel extends DomainModel<FooterModel> {
    

    constructor() {
        super([
            
        ]);
    }

    OnInitialized(): void {

    }
}
