import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, Logger, LogLevel } from '@azure/msal-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBell as faBellRegular, faUser as faUserRegular, faUserCircle as faUserCircleRegular } from '@fortawesome/free-regular-svg-icons';
///https://fontawesome.com/search?q=error&o=r
import { faSignOutAlt,faFilter,faAngleDoubleDown,faBars,faEye,faCopy,faSpider,faSpinner,faAngleDoubleRight,faArrowRight, faChevronDown, faFillDrip, faHome, faLanguage, faMobileAlt, faPowerOff, faStar, faThList, faTv, faUserCircle, faClock, faMinusCircle, faDownload,faPaperclip,faFileUpload,faTimes,faCheckCircle,faRedo, faInfoCircle ,faThumbtack,faSquareFull,faEdit,faRemoveFormat,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { ACTION_CONFIGURATION_LOAD_COMPLETE, ACTION_CONFIGURATION_SETTINGS_LOADED_COMPLETE, Configuration } from 'adk-configuration';
import { ActionSettingsChangeTheme, AppSettingConfig, AppSettingsModel, NIGHT_MODE_THEME, OIDCService, selectorSettings, SettingsState } from 'adk-core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { LoggerService } from 'shared-logger';
import { portalCalenderTodoRegular, portalDocumentGallary,  portalExcelDownload, portalInformationCircleRegular,   portalUpload2CloudRegular, portalUploadRegular, portalUserAddRegular } from 'adk-presentation';
import {  MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
@Component({
    selector: 'starterkit-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    theme: string = 'CUSTOM-THEME';
    isIframe = false;
    @HostBinding('class') componentCssClass;
    private unsubscribe$: Subject<void> = new Subject<void>();
    private readonly _destroying$ = new Subject<void>();

    constructor(public overlayContainer: OverlayContainer,
        public store: Store<any>,
        @Inject(AppSettingConfig) public appSettingsConfig: AppSettingsModel,
        public router: Router,
        library: FaIconLibrary,
        private googleService: OIDCService,
        private broadcastService: MsalBroadcastService,
        private authService: MsalService,
        public loggerService: LoggerService,
        public injector: Injector) {
        this.title = 'StarmpDuty';
        ///https://fontawesome.com/search?q=error&o=r
        //library.addIcons(faBellRegular, faUserCircleRegular, faBars, faPowerOff, faLanguage, faHome, faFillDrip, faUserCircle, faChevronDown, faUserRegular, faTv, faMobileAlt, faStar, faThList, faClock, faMinusCircle, faDownload);
        library.addIcons(  faSignOutAlt,faFilter,faThumbtack, faAngleDoubleDown,faBellRegular, faUserCircleRegular, faBars, faPowerOff, faLanguage, faHome, faFillDrip, faUserCircle, faChevronDown, faUserRegular, faTv, faMobileAlt, faStar,faPaperclip,faFileUpload,faTimes,faCheckCircle,
            faThList, faClock, faMinusCircle, faDownload, 
             portalUserAddRegular, portalUploadRegular,
            portalInformationCircleRegular, portalDocumentGallary, portalCalenderTodoRegular,
            portalUpload2CloudRegular,  portalExcelDownload,faAngleDoubleRight,faArrowRight,faRedo,faInfoCircle,faSpider,faSpinner,faEye,faCopy,faSquareFull,faEdit,faRemoveFormat,faTrash);

    }

    ngOnInit() {
   
        var msalInterceptorConfig :any = this.injector.get(MSAL_INTERCEPTOR_CONFIG);
        msalInterceptorConfig.protectedResourceMap = new Map(msalInterceptorConfig.protectedResourceMap);
     
        if (this.appSettingsConfig.LoginMode === 'azure') {
            this.azureSettings();
        } else if (this.appSettingsConfig.LoginMode === 'google') {
            this.googleService.Init();
        }
        this.listenToSettings();
        this.InitiateConfigurationDetails();
        this.loggerService.startUpListening();
        this.store.dispatch(ActionSettingsChangeTheme({ payload: this.theme })); 

    }

    public azureSettings() {

        this.isIframe = window !== window.parent && !window.opener;
        //debugger;


        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result: EventMessage) => {
              
                const payload = result.payload as AuthenticationResult;
                this.authService.instance.setActiveAccount(payload.account);
            });


        this.broadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this._destroying$)
            )
            .subscribe((x) => {
                // Do user account/UI functions here
           
                this.checkAndSetActiveAccount();
            })



        this.authService.setLogger(new Logger({
            loggerCallback: this.loggerCallback,
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: true,
        }));


    }


    ngOnDestroy() {
    }

    private loggerCallback(logLevel, message, piiEnabled) {
      
    }

    checkAndSetActiveAccount() {
        /**
         * If no active account set but there are accounts signed in, sets first account to active account
         * To use active account set here, subscribe to inProgress$ first in your component
         * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
         */
        let activeAccount = this.authService.instance.getActiveAccount();

        if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
            let accounts = this.authService.instance.getAllAccounts();
            this.authService.instance.setActiveAccount(accounts[0]);
        }
    }

    public getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    private listenToSettings() {
        this.store
            .select(selectorSettings)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(settings => this.setTheme(settings));
    }

    private setTheme(settings: SettingsState) {
        const hours = new Date().getHours();
        const effectiveTheme = (settings.autoNightMode && (hours >= 20 || hours <= 6)
            ? NIGHT_MODE_THEME
            : settings.theme
        ).toLowerCase();
        this.componentCssClass = effectiveTheme;
        const classList = this.overlayContainer.getContainerElement().classList;
        const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
        );
        classList.remove(...toRemove);
        classList.add(effectiveTheme);
    }

    private InitiateConfigurationDetails() {
        const initialConfiguration: Configuration = {
            items: this.appSettingsConfig.ConfigDetails.items,
            moduleNames: [],
            modules: [],
            perspectives: []
        };


        this.store.dispatch(ACTION_CONFIGURATION_LOAD_COMPLETE({payload: initialConfiguration}));
        this.store.dispatch(ACTION_CONFIGURATION_SETTINGS_LOADED_COMPLETE({payload: true}));

    }
}
