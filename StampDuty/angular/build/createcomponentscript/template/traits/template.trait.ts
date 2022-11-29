import { Injector } from '@angular/core';
import { Trait, Validator, ModelObjectFactory, Helpers } from 'shared-framework';
import { TemplateViewModel } from './../template.viewmodel';


export class TemplateInitializationTrait extends Trait<TemplateViewModel> {

    constructor(target: TemplateViewModel) {
        super(target);
    }

    public OnActivated(): void {

    }

}
