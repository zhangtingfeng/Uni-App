import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'adk-core';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', loadChildren: './routers/authentication-router.module#AuthenticationRouterModule', data: { state: 'login', title: 'starterkit Consumption & Reporting', navigateUrl: 'starterkitdashboard', applicationName: 'starterkit-portal:starterkit-portal' } },
  // { path: 'starterkitdashboard', loadChildren: './routers/dashboard-router.module#StarterkitDashboardRouterModule', canLoad: [AuthenticationGuard], data: { state: 'dashboard' } },
  { path: 'login', loadChildren: () => import('./routers/authentication-router.module').then(m => m.AuthenticationRouterModule), data: { state: 'login', title: 'starterkit ', navigateUrl: 'starterkitdashboard', applicationName: 'starterkit-portal:starterkit-portal' }},
  { path: 'starterkitdashboard', loadChildren: () => import('./routers/dashboard-router.module').then(m => m.StarterkitDashboardRouterModule), canLoad: [AuthenticationGuard],data: { state: 'dashboard' , moduleName:"StarterkitModule"} },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
