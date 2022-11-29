import { Injector } from '@angular/core';
import { Trait, Validator, ModelObjectFactory, Helpers } from 'shared-framework';
import { TemplateModel } from './../template.model';

export class TemplateTrait extends Trait<TemplateModel> {

    constructor(target: TemplateModel) {
        super(target);
    }

    public OnActivated(): void {

    }

}
