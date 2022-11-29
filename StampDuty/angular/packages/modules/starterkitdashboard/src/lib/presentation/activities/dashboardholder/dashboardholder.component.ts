import { Component, Inject, Injector, Input, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { AppSettingConfig, AppSettingsModel } from 'adk-core';
import { ActivityComponent, DisposeWith } from 'adk-shared';
import { Helpers, ModelObjectFactory } from 'shared-framework';
import { DashboardHolderViewModel } from './dashboardholder.viewmodel';
import { DashboardHolderModel } from '../../../domainmodels/dashboardholder.model';

@Component({
    selector: 'starterkit-dashboardholder',
    templateUrl: './dashboardholder.component.html',
    styleUrls: ['./dashboardholder.component.scss'],
    providers: [DashboardHolderViewModel]
})
export class DashboardHolderComponent extends ActivityComponent<DashboardHolderViewModel> {

    public leftnavOpen = true;
    public leftnavMode: MatDrawerMode = 'side';
    public SideNavigationClass: string = 'listview';
    public PaddingTopClass: string;

    @Input() drawer;
    @Input()
    public rightnavOpen = false;
    public rightnavMode = 'over';

    @ViewChild('rightnavigation', { static: false })
    public rightnavigation: MatSidenav;

    constructor(public container: Injector, @Inject(AppSettingConfig) public appSettingsConfig: AppSettingsModel) {
        super(container, DashboardHolderViewModel, true);
}


    public OnInitialized(data: any): void {
        this.ListenMediaChanges().pipe(DisposeWith(this)).subscribe();
        this.ViewModel.Model = ModelObjectFactory.Create(DashboardHolderModel, this.container);
        this.PaddingTopClass = (this.IsMobile) ? 'paddingtop_mobile' : 'paddingtop_desktop';
        
        this.DialogBox.closeAll();
    }

    public OnViewModelActivated() {
        super.ListenMediaChanges()
            .pipe(DisposeWith(this))
            .subscribe(res => {
                this.leftnavMode = (this.IsMobile) ? 'over' : 'side';
                this.leftnavOpen = !this.IsMobile;
            });
    }

    public OnDeActivated() {

    }

    public navigateTo(path: string) {
        this.ViewModel.DispatchToActivityAsync({
            path: path
        });
    }

    public getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    public closeLeftNav() {
        this.leftnavOpen = (this.leftnavMode === 'side');
    }

    public LeftNavigationToggleButtonEvent(event: string): void {
        this.SideNavigationClass = event;
    }

}

