import build from './builder';
import { packages, wsdlData, wadlData, documentationData, ngrxDataDetails } from './config';
import * as os from 'os';

let isProdMode = false;
let registryUrl = '';
let incremental: boolean = false;
let skipProxyCreation: boolean = true;
let skipDocumentation: boolean = false;
let projectName = '';
let isLinuxEnvironment: boolean = false;
let args = process.argv.slice(2).filter(function (arg) {
    if (arg.toLowerCase() === '--prod') {
        isProdMode = true;
    } else if (arg.toLowerCase() === '--incremental') {
        incremental = true;
    } else if (arg.toLowerCase() === '--createproxy') {
        skipProxyCreation = false;
    } else if (arg.toLowerCase() === '--skipdocumentation') {
        skipDocumentation = true;        
    } else if (arg.indexOf('registry') >= 0) {
        registryUrl = arg.split('=')[1];
    } else if (arg.toLowerCase().indexOf('--project') >= 0) {
        projectName = arg.split('=')[1].trim();
    } else if (arg.toLowerCase().indexOf('--islinuxenvironment') >= 0 ||  os.type() === "Linux") {
        isLinuxEnvironment = true;
    }
});

build({
    scope: '@digital101',
    productionMode: isProdMode,
    registryUrl: registryUrl,
    incremental: incremental,
    skipProxyCreation: skipProxyCreation,
    skipDocumentation: skipDocumentation,
    packages: packages,
    projectName: projectName,
    wadl: wadlData,
    wsdl: wsdlData,
    documentation: documentationData,
    isLinuxEnvironment: isLinuxEnvironment,
    ngrxDataServices: ngrxDataDetails
}).catch(err => {
    console.error(err);
    process.exit(1);
});
