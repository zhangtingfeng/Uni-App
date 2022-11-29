import { Injector, Injectable } from '@angular/core';
import { ModelViewModel } from 'adk-shared';
import { TextBoxPropertyViewModel, HasTrait } from 'shared-framework';
import { TemplateModel } from './domainmodels/template.model';
import { TemplateInitializationTrait } from './traits/template.trait';

@Injectable()
@HasTrait(TemplateInitializationTrait)
export class TemplateViewModel extends ModelViewModel<TemplateModel, TemplateViewModel>  {
    public Username: TextBoxPropertyViewModel;

    constructor(public injector: Injector) {
        super(injector, []);
    }

    OnViewModelActivated(model: TemplateModel): void {
        this.Username = this.TextBox(this, x => x.UserName).Label('Enter Username');
    }
}

