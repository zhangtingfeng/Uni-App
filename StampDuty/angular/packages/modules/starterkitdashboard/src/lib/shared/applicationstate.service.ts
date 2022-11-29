import { Injectable, Inject, Optional } from '@angular/core';
import { UserStateModel, UserStateConfig } from './userstate.service';
import { Helpers } from 'shared-framework';
import { GridState } from 'aggrid-common';
import { AppSettingConfig, AppSettingsModel } from 'adk-core';
import { MsalService } from '@azure/msal-angular';

@Injectable()
export class ApplicationState {

    public GridStateData: Map<string, GridState> = new Map();

    constructor(@Inject(UserStateConfig) public userStateConfig: UserStateModel,@Inject(AppSettingConfig) public appSettingsConfig: AppSettingsModel,@Optional() public authService: MsalService) {
    }

    public get UserState(): UserStateModel {
        return this.userStateConfig;
    }

    // To Do: Role to be updated once the user details api is available

    public get UserRole(): string {
        return Helpers.IsNotNull(this.userStateConfig) && Helpers.IsNotNullOrEmpty(this.userStateConfig.Role)  ? this.userStateConfig.Role : null;
    }

    public get ResetUserRole(): string {
        return Helpers.IsNotNull(this.userStateConfig) ? this.userStateConfig.Role = '' : null;
    }


    public get IsGlobalPortal(): boolean {
        return this.appSettingsConfig.ApplicationId === 'OneDesk';
    }


    public IsLoggedIn(): boolean {
        //debugger;
        if (Helpers.IsNotNull(this.authService) && this.appSettingsConfig.LoginMode === 'azure') {           
            return (Helpers.IsNotNull(this.authService.instance.getActiveAccount())) ? true : false;
        }
        else if (Helpers.IsNotNull(this.authService) && this.appSettingsConfig.LoginMode === 'google') {
            return true;
        }
        else {
            return Helpers.IsNotNull(localStorage.getItem('currentUser')) ? true : false;
        }
    }


}