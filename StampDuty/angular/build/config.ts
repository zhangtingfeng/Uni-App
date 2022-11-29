import { Type } from "typescript";

export interface PackageDescription {
    name: string;
    hasTestingModule: boolean;
    relativePath?: string;
    isProductionMode?: boolean;
    baseHref?: string;
}

export interface ProxyGenerationDetails {
    name: string;
    sourcePath: string;
    destinationFolder: string;
    moduleName: string;
    isModuleService?: boolean;
    includeModuleNameToKey?: boolean;
}

export interface DocumentationProjectDetails {
    name: string;
    path: string;
}

export interface NgrxDataServiceDetails {
    name: string;
    dtoName: string;
    proxyServiceName: string;
    getAllMethodName: string;
    getByIdMethodName: string;
    extraParams?: string;
}

export interface NgrxDataDetails {
    outputPath: string;
    indexedDBSchemaOutputPath: string;
    services: NgrxDataServiceDetails[];
}

export interface Config {
    packages: PackageDescription[];
    scope: string;
    registryUrl: string;
    incremental: boolean;
    skipProxyCreation: boolean;
    skipDocumentation: boolean;
    productionMode: boolean;
    projectName: string;
    wadl: ProxyGenerationDetails[];
    wsdl: ProxyGenerationDetails[];
    documentation: DocumentationProjectDetails[];
    isLinuxEnvironment: boolean;
    ngrxDataServices: NgrxDataDetails;
}



export const ngrxDataServices: NgrxDataServiceDetails[] = [
];

export const ngrxDataDetails: NgrxDataDetails = {
    outputPath: './packages/framework/adk/adk-repository/src/lib/services/ngrxdataservices/',
    indexedDBSchemaOutputPath: './packages/framework/adk/adk-repository/src/lib/services/',
    services: ngrxDataServices
}

export const packages: PackageDescription[] = [
    { name: 'starterkitdashboard', hasTestingModule: false },
    { name: 'starterkit', hasTestingModule: false, isProductionMode: true, baseHref: '' },
];


export const wadlData: ProxyGenerationDetails[] = [
    { name: 'SituQueryModule', sourcePath: 'build/assets/proxies/wadl/situquery.json', destinationFolder: './packages/modules/starterkitdashboard/src/lib/services/situqueryproxy/query/', moduleName: 'SituQueryModule', isModuleService: true, includeModuleNameToKey: true },
  { name: 'UploadModule', sourcePath: 'build/assets/proxies/wadl/upload.json', destinationFolder: './packages/modules/starterkitdashboard/src/lib/services/uploadproxy/JavaMake/', moduleName: 'UploadModule', isModuleService: true, includeModuleNameToKey: true },
 
    // { name: 'StarterkitStaticDataProxyModule', sourcePath: './build/assets/proxies/wadl/recapsquery.json', destinationFolder: './packages/modules/concentratesdashboard/src/lib/services/recapsmanagementproxy/query/', moduleName: 'RecapsQueryProxyModule', isModuleService: true, includeModuleNameToKey: true },
    // { name: 'StarterkitStaticDataProxyModule', sourcePath: './build/assets/proxies/wadl/recapscommand.json', destinationFolder: './packages/modules/concentratesdashboard/src/lib/services/recapsmanagementproxy/command/', moduleName: 'RecapsCommandProxyModule', isModuleService: true, includeModuleNameToKey: true },
];

export const wsdlData: ProxyGenerationDetails[] = [
    // { name: 'SRDReferenceDataModule', sourcePath: './build/assets/proxies/wsdl/LegalEntityService.wsdl', destinationFolder: './packages/framework/adk/adk-repository/src/lib/services/soapreferencedataproxy/', moduleName: 'SRDReferenceDataModule', isModuleService: true },
    // { name: 'SRDApi2ReferenceDataModule', sourcePath: './build/assets/proxies/wsdl/SRDAPI2Service.wsdl', destinationFolder: './packages/framework/adk/adk-repository/src/lib/services/srdapi2referencedataproxy/', moduleName: 'SRDApi2ReferenceDataModule', isModuleService: true },
    // { name: 'InvoicingServiceProxyModule', sourcePath: './packages/applications/digital101/src/assets/proxies/wsdl/InvoicingService.wsdl', destinationFolder: './packages/modules/modules.salesinvoicing/src/services/serviceproxy/', moduleName: 'InvoicingProxyModule', isModuleService: false },

];

export const documentationData: DocumentationProjectDetails[] = [
    { name: 'developerguide', path: './build/assets/documentation/.compodocrc.json' }
];
