import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivityComponent, DisposeWith } from 'adk-shared';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModelObjectFactory } from 'shared-framework';
import { HAMBURGERMENU_ITEM_HEIGHT_DEFINITION_FACTORY } from '../../../../domainmodels/constants/viewportheightdefinitionfactory.constants';
import { LeftNavigationModel } from '../../../../domainmodels/leftnavigation.model';
import { LeftNavigationViewModel } from './leftnavigation.viewmodel';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'starterkit-leftnavigation',
	templateUrl: './leftnavigation.component.html',
	styleUrls: ['./leftnavigation.component.scss'],
	providers: [LeftNavigationViewModel]
})
export class LeftNavigationComponent extends ActivityComponent<LeftNavigationViewModel> {
	public selectedIndex: any;
	@Input() LeftSideNavigation;
	public ValueHolder: string = 'list';
	@Output() LeftNavigationToggleButtonEvent: EventEmitter<string> = new EventEmitter();
	public ToggleButtonStyle: any;
	public ToggleLayoutType: string = 'row';

	constructor(public container: Injector, private deviceService: DeviceDetectorService) {
		super(container, LeftNavigationViewModel);
	}

	OnInitialized(data: any): void {
		this.ListenMediaChanges().pipe(DisposeWith(this)).subscribe();
		this.ViewModel.Model = ModelObjectFactory.Create(LeftNavigationModel, this.container);
		let deviceInfo = this.deviceService.getDeviceInfo();
		this.ViewModel.MenuItemHeight = HAMBURGERMENU_ITEM_HEIGHT_DEFINITION_FACTORY(this.deviceService, deviceInfo);
	}

	public NavigateTo(menuname: string, index: any) {
		this.selectedIndex = index;
		switch (menuname.toLowerCase()) {
			case 'dashboard':
				this.Navigate('/starterkitdashboard/home');
				break;
			case 'upload':
				this.Navigate('/starterkitdashboard/upload');
				break;
			case 'configuration':
				this.Navigate('/starterkitdashboard/configuration');
				//this.Navigate('/starterkitdashboard/reportshow');
				break;
			case 'report':
				this.Navigate('/starterkitdashboard/report');
				//this.Navigate('/starterkitdashboard/reportshow');
				break;
		}
	}

	public Navigate(path: string, params?: any) {
		this.ViewModel.DispatchToActivityAsync({
			path: path,
			queryParams: params,
		});
	}

	public SelectedMenuItem(event: any): void {
		this.NavigateTo(event.id, 0);
	}

	public ToggleViewText(selectedIcon: MatButtonToggleChange) {
		this.ViewModel.IsEliteView = (selectedIcon.value === 'elite') ? true : false;
		this.AssignIconicTemplate(selectedIcon.value);
		this.LeftNavigationToggleButtonEvent.emit(this.AssignTogleModeClass(selectedIcon.value));
	}

	private AssignIconicTemplate(selectedIcon: string): void {
		switch (selectedIcon) {
			case 'iconic':
			case 'elite':
				this.ViewModel.MenuItemHeight = 45;
				this.ViewModel.IsIconView = true;
				this.ViewModel.TrafiguraLogo = '/assets/trafemblem_white.svg';
				this.ToggleButtonStyle = { 'flex-wrap': 'wrap' };
				this.ToggleLayoutType = 'column';
				// TODO - Enable below two line if children as menu required
				/* this.ViewModel.ChildrenAsMenu = true;
				this.ViewModel.ExpandedIcon = ['fas', 'angle-right']; */
				break;
			default:
				this.ViewModel.IsIconView = false;
				// TODO - Enable below line if children as menu required
				// this.ViewModel.ChildrenAsMenu = false;
				this.ViewModel.TrafiguraLogo = '/assets/traflogo_white.svg';
				this.ToggleButtonStyle = { 'display': 'flex' };
				this.ToggleLayoutType = 'row';
				break;
		}
	}

	private AssignTogleModeClass(selectedIcon: string): string {
		switch (selectedIcon) {
			case 'iconic':
				return selectedIcon + 'view_withoutchild';
			case 'elite':
				return selectedIcon + 'view';
			default:
				return selectedIcon + 'view';
		}
	}
}
