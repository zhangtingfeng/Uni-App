import { DisposeWith } from 'adk-shared';
import { combineLatest } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Helpers, Trait } from 'shared-framework';
import { UserStateConfig, UserStateModel } from '../../../../../shared/userstate.service';
import { HeaderViewModel } from '../header.viewmodel';

export class HeaderInitializationTrait extends Trait<HeaderViewModel> {
    public userStateConfig: UserStateModel;
    constructor(target: HeaderViewModel) {
        super(target);
        this.userStateConfig = target.Container.get(UserStateConfig);
    }

    public OnActivated(): void {
        //debugger;
        let RoleChanged$ = this.userStateConfig.RoleChange.pipe(startWith(this.Target.StateData.UserRole));
     
        combineLatest([this.Target.WhenNewModel(), RoleChanged$])
            .pipe(
                filter(x => {
                    return Helpers.IsNotNull(x[1]) && Helpers.IsNotNullOrEmpty(x[1][0]);
                }),
                tap(() => {
                    this.Target.InProgressMessage = 'Loading...';
                }),
                map(x => {
                    return x;
                }),
                tap(() => {
                    this.Target.InProgressMessage = '';
                }),
                DisposeWith(this)
            )
            .subscribe(() => {
               
                this.Target.ClientName = this.Target.StateData.userStateConfig.User;
            })

    }

}