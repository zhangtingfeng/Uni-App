import { Trait } from 'shared-framework';
import { ComponentTemplateModel } from '../componenttemplate.model';


export class ComponentTemplateTrait extends Trait<ComponentTemplateModel> {

    constructor(target: ComponentTemplateModel) {
        super(target);
    }

    public OnActivated(): void {

    }

}
