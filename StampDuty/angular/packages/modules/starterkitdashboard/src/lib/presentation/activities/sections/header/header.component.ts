import { Component, Inject, Injector, Input, Optional } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ActionSettingsChangeTheme, AppSettingConfig, AppSettingsModel, OIDCService } from 'adk-core';
import { ActivityComponent, DisposeWith } from 'adk-shared';
import { ModelObjectFactory } from 'shared-framework';
import { HeaderModel } from '../../../../domainmodels/header.model';
import { HeaderViewModel } from './header.viewmodel';

@Component({
	selector: 'starterkit-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	providers: [HeaderViewModel]
})
export class HeaderComponent extends ActivityComponent<HeaderViewModel> {

	@Input() LeftSideNavigation;

	constructor(public container: Injector, @Optional() public authService: MsalService, private googleService: OIDCService, @Inject(AppSettingConfig) public appSettingsConfig: AppSettingsModel) {
		super(container, HeaderViewModel);
	
	}

	OnInitialized(data: any): void {
		if (!data.languageChanged) {
			this.ViewModel.Model = ModelObjectFactory.Create(HeaderModel, this.container);
		}
		this.ListenMediaChanges().pipe(DisposeWith(this)).subscribe();
	}

	public Logout(): void {
		if (this.appSettingsConfig.LoginMode === 'azure') {
			this.authService.logout();
		} else if (this.appSettingsConfig.LoginMode === 'google') {
			this.googleService.logout();
			this.ExitApplication();
		} else {
			this.ExitApplication();
		}
	}

	private ExitApplication(): void {
		this.NavigateTo('exit');
	}

	public NavigateTo(menuname: string): void {
		switch (menuname.toLowerCase()) {
			case 'home':
				this.navigate('/starterkitdashboard/home');
				break;
			case 'exit':
				this.Logout();
				break;
		}
	}

	public navigate(path: string): void {
		this.ViewModel.DispatchToActivityAsync({
			path: path,
		});
	}

	public language(lang: string): void {
		this.ViewModel.Model.SelectedLanguage = lang;
	}

	public ApplyTheme(theme: string) {
		this.ViewModel.Store$.dispatch(ActionSettingsChangeTheme({ payload: theme }));
	}

}
