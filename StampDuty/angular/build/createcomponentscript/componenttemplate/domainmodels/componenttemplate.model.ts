import { MetaData, DomainModel, HasTrait } from 'shared-framework';
import { ComponentTemplateMetaData } from './componenttemplate.metadata';
import { ComponentTemplateTrait } from './traits/componenttemplate.trait';

@MetaData(ComponentTemplateMetaData)
@HasTrait(ComponentTemplateTrait)
export class ComponentTemplateModel extends DomainModel<ComponentTemplateModel> {
    public UserName: string = '';

    constructor() {
        super([
            x => x.UserName
        ]);
    }

    OnInitialized(): void {

    }
}
