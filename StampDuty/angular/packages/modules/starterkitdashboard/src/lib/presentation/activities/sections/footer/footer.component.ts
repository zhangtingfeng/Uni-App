import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityComponent } from 'adk-shared';
import { ModelObjectFactory, NavigationTriggerService } from 'shared-framework';
import { FooterModel } from '../../../../domainmodels/footer.model';
import { FooterViewModel } from './footer.viewmodel';
export const moment = momentdata;
import * as momentdata from 'moment';

@Component({
  selector: 'starterkit-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [FooterViewModel]
})
export class FooterComponent extends ActivityComponent<FooterViewModel> {

  public CopyRight: string = 'Copyright';
  public CopyrightYear: string;
  public FAQ: string = 'FAQ';
  public Contact: string = 'Contact Us';
  public TC: string = 'T&C';
  constructor(public container: Injector, public DialogService: MatDialog, public NavigationServiceTrigger: NavigationTriggerService) {
    super(container, FooterViewModel);
  }

  OnInitialized(data: any): void {
    if (!data.languageChanged) {
      this.ViewModel.Model = ModelObjectFactory.Create(FooterModel, this.container);
    }
    this.CopyrightYear = moment().format('YYYY');
    this.CopyRight = this.ViewModel.translate('Copyright');
    this.Contact = this.ViewModel.translate('Contact Us');
    this.FAQ = this.ViewModel.translate('FAQ');
    this.TC = this.ViewModel.translate('T&C');
  }

  public NavigateHandler(path: string): void {
    // Call NavigateTo() for redirection
  }

  public NavigateTo(): void {
    let path: string = '/starterkitdashboard/faqpage';
    this.ViewModel.DispatchToActivityAsync({
      path: path,
    });
  }
}
