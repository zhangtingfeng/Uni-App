import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { ActivityComponent, DisposeWith } from 'adk-shared';
import { Helpers, ModelObjectFactory } from 'shared-framework';
import { DashboardModel } from '../../../domainmodels/dashboard.model';
import { ApplicationState } from '../../../shared/applicationstate.service';
import { CarouselInterface, CAROUSEL_ITEMS } from '../../../starterkitdashboard.constants';
import { DashboardViewModel } from './dashboard.viewmodel';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'starterkitdashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [DashboardViewModel]
})
export class DashboardComponent extends ActivityComponent<DashboardViewModel> {
    GridState: boolean = true;
    public OuterClass: Object;
    public TileClass: string;
    public TileTitleClass: string;
    public TileDescriptionClass: string;
    public appState: ApplicationState;
    
    constructor(public container: Injector) {
        super(container, DashboardViewModel);
    }

    OnInitialized(data: any): void {
        
        if (!data.langaugeChanged) {
            //debugger;
            this.ViewModel.Model = ModelObjectFactory.Create(DashboardModel, this.container);
        }
        this.ApplyScreenResolution();                             
        this.ViewModel.Model.BannerContent = {
            bannerTitle: 'Welcome to Trafigura Accounts stamp duty',
            bannerDescription: 'Provide detailed calculation service of Stamp duty.',
            bannerImage: './assets/aplanding.jpg'
        };
        this.ViewModel.Model.CarouselItemSource = this.getCarouselItems();
        
    }


    private getCarouselItems(): CarouselInterface[] {
        //return Helpers.IsNotNull(this.appState.UserRole) && this.appState.UserRole.length > 0 ? CAROUSEL_ITEMS(this.ViewModel.TranslationCollection).filter(x => x.roles.some(x => this.appState.UserRole.includes(x))) : [];
        return CAROUSEL_ITEMS(this.ViewModel.TranslationCollection);
    }



    public NavigateTo(menuname: string) {
        switch (menuname.toLowerCase()) {
            case 'upload':
                this.Navigate('/starterkitdashboard/upload');
                break;
            case 'configuration':
                this.Navigate('starterkitdashboard/configuration');
                break;
            case 'report':
                this.Navigate('/starterkitdashboard/report');
                break;
            case 'admin':
                //this.Navigate('/apinvoicesdashboard/admin');
                break;
            case 'scanreport':
                this.Navigate('/starterkitdashboard/scanreport');
                break;
        }
    }

    public Navigate(path: string, params?: any) {
        this.ViewModel.DispatchToActivityAsync({
            path: path,
            queryParams: params,
        });
    }

    public changeGridState(GridState: boolean) {
        this.GridState = GridState;
    }

    private ApplyScreenResolution(): void {
        this.TileClass = (window.innerHeight > 900) ? 'tile_desktop' : 'tile_laptop';
        this.TileTitleClass = (window.innerHeight > 900) ? 'title_desktop' : 'title_laptop';
        this.TileDescriptionClass = (window.innerHeight > 900) ? 'description_desktop' : 'description_laptop';
    }
}

