import * as tasks from './tasks';
import { createBuilder } from './util';
import { packages, wsdlData, wadlData, documentationData, ngrxDataServices } from './config';

const deploy = createBuilder([
    ['Deploy builds', tasks.publishToRepo]
]);
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
    } else if (arg.toLowerCase().indexOf('--isLinuxEnvironment') >= 0) {
        isLinuxEnvironment = true;
    }
});


deploy({
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
    ngrxDataServices: ngrxDataServices
}).catch(err => {
    console.error(err);
    process.exit(1);
});

