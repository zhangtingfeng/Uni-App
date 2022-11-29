import { Injectable, Injector } from '@angular/core';
import { ModelViewModel } from 'adk-shared';
import { HasTrait, TextBoxPropertyViewModel } from 'shared-framework';
import { ComponentTemplateModel } from './domainmodels/componenttemplate.model';
import { ComponentTemplateInitializationTrait } from './traits/componenttemplate.trait';


@Injectable()
@HasTrait(ComponentTemplateInitializationTrait)
export class ComponentTemplateViewModel extends ModelViewModel<ComponentTemplateModel, ComponentTemplateViewModel>  {
    public Username: TextBoxPropertyViewModel;

    constructor(public injector: Injector) {
        super(injector, []);
    }

    OnViewModelActivated(model: ComponentTemplateModel): void {
        this.Username = this.TextBox(this, x => x.UserName).Label('Enter Username');
    }
}

