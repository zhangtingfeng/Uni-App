import { Inject, Injectable } from '@angular/core';
import { CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { getApplication } from 'adk-core';
import { Helpers } from 'shared-framework';
import { ApplicationId } from './starterkitdashboard.constants';


@Injectable()
export class RoutingGuardService implements CanActivateChild {

    constructor(private router: Router, @Inject(Store) public store: Store) {
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url.toLowerCase();
        let navigatedUrl: string;
        let objApplication: any;

        if (url === '/starterkitdashboard/home' || url === '/starterkitdashboard/errorpage') {
            return true;
        }

        this.store.select(getApplication(ApplicationId)).subscribe(x => {
            objApplication = x;

            if (Helpers.IsNotNull(objApplication) && objApplication.roles.length > 0) {
                navigatedUrl = objApplication.roles[0].componentList.find(x => {
                    return (url.indexOf(x) !== -1)
                })
                if (Helpers.IsNotNullOrEmpty(navigatedUrl)) {
                    return true;
                } else {
                    this.router.navigate(['/starterkitdashboard/errorpage']);
                    return false;
                }
            }
        })
        return true;

    }
} 