
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AdkCoreModule, AppSettingConfig, AppSettingsModel, AuthorizationHeaderInterceptor, FileDownloadInterceptor, OIDCService, RouterEffects } from 'adk-core';
import { LABEL_OPTIONS } from 'adk-presentation';
import { AdkSharedModule, IReferenceDataRepositories, ReferenceDataRepositories, RepositoryActionMap, TranslationModule, TranslationService } from 'adk-shared';
import { CONFIG_TOKEN, DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { SharedApiclientModule } from 'shared-apiclient';
import { SharedCoreModule } from 'shared-core';
import { ITranslationService, SharedFrameworkModule } from 'shared-framework';
import { SharedLoggerModule } from 'shared-logger';
import { SharedMessagingModule } from 'shared-messaging';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './AppHttpInterceptor';
import { LocalStorage } from './common/local.storage';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export const dbConfig: DBConfig = {
  name: 'titan',
  version: 1,
  objectStoresMeta: [

  ]
};

function MSALInstanceFactory(appSettingsModel: AppSettingsModel): IPublicClientApplication {
  return new PublicClientApplication(appSettingsModel.OpenIdDetails.azure.msalInstanceConfig);
}

function MSALGuardConfig(appSettingsModel: AppSettingsModel): MsalGuardConfiguration {
  return appSettingsModel.OpenIdDetails.azure.msalGuardConfig;
}

function MSALIntercptorConfig(appSettingsModel: AppSettingsModel): MsalInterceptorConfiguration {
  return appSettingsModel.OpenIdDetails.azure.msalInterceptorConfig;
}

function getConfigToken(appSettingsModel: AppSettingsModel): DBConfig {
  return { ...dbConfig, name: appSettingsModel.ApplicationId, version: Number(appSettingsModel.Version.replace(/\./g, '')) };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // framework specific
    SharedCoreModule,
    SharedFrameworkModule,
    SharedMessagingModule,
    SharedApiclientModule,
    SharedLoggerModule,
    AdkCoreModule.forRoot(environment.baseHref),
    AdkSharedModule,

    //i18n related
    TranslationModule,

    // app related
    EffectsModule.forFeature([RouterEffects]),
    true ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    PerfectScrollbarModule,
    EntityDataModule.forRoot({}),
    NgxIndexedDBModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: IReferenceDataRepositories, useClass: ReferenceDataRepositories },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHeaderInterceptor, multi: true },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: LABEL_OPTIONS, useValue: { floatType: 'float', appearance: '', hideValidationErrorIcon: false, hideGroupHeaderUnderLine: true } },
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory, deps: [AppSettingConfig] },
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfig, deps: [AppSettingConfig] },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALIntercptorConfig, deps: [AppSettingConfig] },
    { provide: CONFIG_TOKEN, useFactory: getConfigToken, deps: [AppSettingConfig] },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: FileDownloadInterceptor, multi: true },
    OIDCService,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    RepositoryActionMap,
    LocalStorage,
    //i18n related 
    { provide: ITranslationService, useClass: TranslationService },

  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
