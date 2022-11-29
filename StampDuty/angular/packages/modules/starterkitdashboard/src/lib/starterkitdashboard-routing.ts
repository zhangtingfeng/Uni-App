import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdkSharedModule } from 'adk-shared';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridCommonModule } from 'aggrid-common';
import { BlotterClientComponent } from './presentation/activities/blotterclient/blotterclient.component';
import { BlotterClientDialogComponent } from './presentation/activities/blotterclientdialog/blotterclientdialog.component';
import { DashboardComponent } from './presentation/activities/dashboard/dashboard.component';
import { DashboardHolderComponent } from './presentation/activities/dashboardholder/dashboardholder.component';
import { EditDialogComponent } from './presentation/activities/editdialog/editdialog.component';
import { FooterComponent } from './presentation/activities/sections/footer/footer.component';
import { HeaderComponent } from './presentation/activities/sections/header/header.component';
import { LeftNavigationComponent } from './presentation/activities/sections/leftnavigation/leftnavigation.component';
import { UploadTemplateComponent } from './presentation/activities/uploadtemplate/uploadtemplate.component';

import { RoutingGuardService } from './routeguard';
/// { path: 'history', component: BlotterClientComponent,  data: { state: 'history', blotterheading: 'History' },
/// { path: 'history', component: ReportshowComponent,  data: { state: 'history', blotterheading: 'History' },
const routes: Routes = [
    {
        path: '', component: DashboardHolderComponent,canActivateChild: [RoutingGuardService],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
          //  { path: 'home', component: DashboardComponent, data: {} },
          // { path: 'home', component: UploadTemplateComponent, data: {} },
           //{ path: 'home', component: BlotterClientComponent,  data: { state: 'upload', blotterheading: 'Upload Stamp Duty' }},
           //uploadtemplate.component
           { path: 'home', component: BlotterClientComponent,  data: {  state: 'configuration', blotterheading: 'configuration' }},
           { path: 'upload', component: BlotterClientComponent,  data: { state: 'upload', blotterheading: 'Upload' }},
            { path: 'configuration', component: BlotterClientComponent,  data: { state: 'configuration', blotterheading: 'configuration' }},
            { path: 'report', component: BlotterClientComponent,  data: { state: 'report', blotterheading: 'Report' }},
           
        ]
    }
]

@NgModule({

    imports: [
        AdkSharedModule,
        AgGridCommonModule,
        RouterModule.forChild(routes),
        AgGridModule.withComponents([])
    ],
    exports: [
        RouterModule,
    ],
    entryComponents: [],
    declarations: [
        DashboardComponent,
        DashboardHolderComponent,
        HeaderComponent,
        FooterComponent,
        LeftNavigationComponent,
        BlotterClientComponent,        
        UploadTemplateComponent,
        BlotterClientDialogComponent,
        EditDialogComponent
        
    ],
    providers: []
})

export class StarterkitDashboardRoutingModule {

}