import { Component, Injector } from '@angular/core';
import { ActivityComponent } from 'adk-shared';
import { ModelObjectFactory } from 'shared-framework';
import { ComponentTemplateViewModel } from './componenttemplate.viewmodel';
import { ComponentTemplateModel } from './domainmodels/componenttemplate.model';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'concentrates-ComponentTemplate',
  templateUrl: './ComponentTemplate.component.html',
  styleUrls: ['./ComponentTemplate.component.scss'],
  providers: [ComponentTemplateViewModel]
})
export class ComponentTemplateComponent extends ActivityComponent<ComponentTemplateViewModel> {

  constructor(public container: Injector) {
    super(container, ComponentTemplateViewModel);
  }

  OnInitialized(data: any): void {
    this.ViewModel.Model = ModelObjectFactory.Create(ComponentTemplateModel, this.container);
  }
}
