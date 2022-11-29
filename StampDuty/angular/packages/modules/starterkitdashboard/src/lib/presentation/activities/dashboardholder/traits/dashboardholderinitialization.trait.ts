import { DisposeWith } from 'adk-shared';
import { Helpers, NavigationTriggerService, Trait } from 'shared-framework';
import { ApplicationState } from '../../../../shared/applicationstate.service';
import { UserStateConfig, UserStateModel } from '../../../../shared/userstate.service';
import { DashboardHolderViewModel } from '../dashboardholder.viewmodel';
import { IStarterkitClientService } from '../../../../services/clientservice/istarterkit.service';
import { filter, switchMap, tap } from 'rxjs';
import { ACTION_USER_SAVE, GlobalUserState, RoleState, SELECTED_LANGUAGE } from 'adk-core';
import { AppAccountsDto } from '../../../../services/situqueryproxy/query/ServiceTypes';
import { ApplicationId, SafeGuardRoutingList } from '../../../../starterkitdashboard.constants';
import { SessionMonitor } from 'oidc-client';



export class DashboardHolderInitializationTrait extends Trait<DashboardHolderViewModel> {

    public clientService: IStarterkitClientService;
    public userStateConfig: UserStateModel;
    public IsUserDetailCalled: boolean = false;
    public navigationService: NavigationTriggerService;
    public appState: ApplicationState;


    constructor(target: DashboardHolderViewModel) {
        super(target);
        this.clientService = target.Container.get(IStarterkitClientService);
        this.userStateConfig = target.Container.get(UserStateConfig);
        this.navigationService = target.Container.get(NavigationTriggerService);
        this.appState = target.Container.get(ApplicationState);
    }

    public OnActivated(): void {


        this.Target.WhenNewModel()
            .pipe(
                filter(() => !this.IsUserDetailCalled && this.Target.StateData.IsLoggedIn()),
                tap(() => {
                    this.Target.InProgressMessage = 'Connecting...';
                }),
                switchMap(() => {
                    this.IsUserDetailCalled = true;
                    return this.clientService.GetUserDetails();
                }),
                tap(() => { this.Target.InProgressMessage = ''; }),
                DisposeWith(this)
            ).subscribe(x => {
                if (Helpers.IsNotNull(x) && Helpers.IsNotNull(this.appState) && !this.appState.IsGlobalPortal) {

                    this.Target.Store$.dispatch(ACTION_USER_SAVE({ payload: this.SetGlobalUserState(x) }));
                    this.Target.Store$.dispatch(SELECTED_LANGUAGE({ payload: 'en' }));

                    this.userStateConfig.Role = "ROLE_ADMIN";
                    this.userStateConfig.Username = "Stamp duty";
                    this.userStateConfig.User = x.lastName + " " + x.firstName;
                   
                    this.userStateConfig.RoleChange.next(this.userStateConfig.Role);
                    if (this.userStateConfig.Role === 'ROLE_ADMIN') {
                        this.Target.DispatchToActivityAsync({
                            path: '/starterkitdashboard/home'
                        });
                    }
                }
            });


            this.Target.WhenNewModel()
            .pipe(
                
                tap(() => {
                    this.Target.InProgressMessage = 'Connecting company...';
                }),
                switchMap(() => {
                    return this.clientService.getGroupCompanyListUsingGet();
                }),
                tap(() => { this.Target.InProgressMessage = ''; }),
                DisposeWith(this)
            ).subscribe(x => {
//sessionStorage.
                //uList.push({ Identifier: "TEZ", Code: "TEZ", Description: "TEZ托克能源（浙江）有限公司" });
                if (x && x instanceof Array){
                    let uList = [];
                    for(let i = 0; i < x.length; i++) { 
                      /*
                      gcStampDutyTemplateID
: 
"1"
groupCompanyCNName
: 
"宁波创坤贸易有限公司"
groupCompanyCode
: 
"TCL"
groupCompanyENName
: 
"Ningbo Trans-Coal Trading Co., Ltd."
groupCompanyID
: 
4
                      */
                      
                        uList.push({ Identifier: x[i].groupCompanyCode, Code: x[i].groupCompanyCode, Description: x[i].groupCompanyCode+ x[i].groupCompanyCNName});
                      
                     }

                     sessionStorage.setItem("Stampduty.groupCompany",JSON.stringify(uList));
                    

                }

               
            });

        this.navigationService.InProgressMessage.pipe(
            DisposeWith(this)
        )
            .subscribe(data => {
                setTimeout(() => {
                    //debugger;
                    this.Target.InProgressData = data;
                });

            });

    }

    private SetGlobalUserState(response: AppAccountsDto): GlobalUserState {
        let rolesData: RoleState[] = [];
        response.roles.forEach((element, index) => {
            let objSafeGuardRouteItem = SafeGuardRoutingList.find(x => x.roleid === element.name);
            // rolesData.push({ roleId: index.toString(), roleDescription: element.name, componentList: objSafeGuardRouteItem.componentList });
        });
        return {
            userId: response.userId.toString(),
            userName: response.username,
            userFullName: response.firstName + ' ' + response.lastName,
            application: [{
                applicationId: ApplicationId,
                applicationName: 'Stamp duty',
                applicationDescription: 'Stamp duty report',
                roles: rolesData
            }
            ],
            email: response.email
        };
    }


}


