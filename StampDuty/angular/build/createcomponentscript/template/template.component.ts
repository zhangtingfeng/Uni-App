import { Component, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityComponent } from 'adk-shared';
import { ModelObjectFactory } from 'shared-framework';
import { TemplateModel } from './domainmodels/template.model';
import { TemplateViewModel } from './template.viewmodel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'am-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  providers: [TemplateViewModel]
})
export class TemplateComponent extends ActivityComponent<TemplateViewModel> {

  constructor(public container: Injector) {
    super(container, TemplateViewModel);
  }

  OnInitialized(data: any): void {
    this.ViewModel.Model = ModelObjectFactory.Create(TemplateModel, this.container);
  }
}
