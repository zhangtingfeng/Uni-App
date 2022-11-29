import { Injectable, Injector } from '@angular/core';
import { ModelViewModel } from 'adk-shared';
import { HasTrait } from 'shared-framework';
import { FooterModel } from '../../../../domainmodels/footer.model';
import { FooterInitializationTrait } from './traits/footer.trait';

@Injectable()
@HasTrait(FooterInitializationTrait)
export class FooterViewModel extends ModelViewModel<FooterModel, FooterViewModel>  {


    constructor(public injector: Injector) {
        super(injector, [], 'starterkitFooter');
    }

    OnViewModelActivated(model: FooterModel): void {

    }
}

