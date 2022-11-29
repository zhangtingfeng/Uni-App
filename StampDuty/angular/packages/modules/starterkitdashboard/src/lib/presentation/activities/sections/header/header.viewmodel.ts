import { Injectable, Injector } from '@angular/core';
import { ModelViewModel } from 'adk-shared';
import { HasTrait } from 'shared-framework';
import { HeaderModel } from '../../../../domainmodels/header.model';
import { ApplicationState } from '../../../../shared/applicationstate.service';
import { HeaderInitializationTrait } from './traits/header.trait';

@Injectable()
@HasTrait(HeaderInitializationTrait)
export class HeaderViewModel extends ModelViewModel<HeaderModel>  {
    public ClientName: string = '';
    constructor(public injector: Injector, public StateData: ApplicationState) {
        super(injector, []);

    } 

    OnViewModelActivated(model: HeaderModel): void {
    }

    public LoadTrafiguraPage(): void {
        window.open('https://www.trafigura.com/about-us/', '_blank');
    }
}

