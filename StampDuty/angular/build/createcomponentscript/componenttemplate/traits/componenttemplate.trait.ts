import { Trait } from 'shared-framework';
import { ComponentTemplateViewModel } from './../componenttemplate.viewmodel';


export class ComponentTemplateInitializationTrait extends Trait<ComponentTemplateViewModel> {

    constructor(target: ComponentTemplateViewModel) {
        super(target);
    }

    public OnActivated(): void {

    }

}
