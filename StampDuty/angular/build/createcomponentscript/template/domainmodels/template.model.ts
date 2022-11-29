import { MetaData, DomainModel, HasTrait } from 'shared-framework';
import { TemplateMetaData } from './template.metadata';
import { TemplateTrait } from './traits/template.trait';

@MetaData(TemplateMetaData)
@HasTrait(TemplateTrait)
export class TemplateModel extends DomainModel<TemplateModel> {
    public UserName: string = '';

    constructor() {
        super([
            x => x.UserName
        ]);
    }

    OnInitialized(): void {

    }
}
