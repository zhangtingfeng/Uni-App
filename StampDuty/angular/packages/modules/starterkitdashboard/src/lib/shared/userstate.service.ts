import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export interface UserStateModel {
    Username: string;
    User: string;
    Role: string;
    RoleChange?: Subject<string>;
    ErrorHandler?: Subject<string>;
}

export const UserState: UserStateModel = {
    Username: '',
    User: '',
    Role: '',
    RoleChange: new Subject<string>(),
    ErrorHandler: new Subject<string>()
};

export const UserStateConfig = new InjectionToken<UserStateModel>('userstatemodel');
