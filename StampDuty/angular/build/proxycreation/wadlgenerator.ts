let restClientGenerator = require('./rest-client-generator/rest-client-generator');
let wadlParser = require('./rest-client-generator/wadl-parser');
let swagParser = require('./rest-client-generator/swagger2-parser');
import * as util from '../util';

export class WadlGenerator {
    public wadlOpts = {
        input: '',
        outputFile: '',
        platform: 'angular2-ts',
        rootUrl: 'localhost:8080',
        serviceSuffix: '',
        serviceExclude: 'endpoint',
        methodExclude: 'method',
        capitalize: true,
        internalVariablePrefix: '_',
        isModuleService: false,
        moduleName: '',
        includeModuleNameToKey: false
    };

    public async Convert(inputPath: string, outputPath: string, moduleName: string, isModuleService: boolean = false, includeModuleNameToKey: boolean = false) {
        this.wadlOpts.input = inputPath;
        this.wadlOpts.outputFile = outputPath;
        this.wadlOpts.isModuleService = isModuleService;
        this.wadlOpts.moduleName = moduleName;
        this.wadlOpts.includeModuleNameToKey = includeModuleNameToKey;
        await util.exec('rimraf', [outputPath])
        .then(isSuccess => {
            return util.exec('mkdirp', [outputPath]); //util.mkdirpp(outputPath);
        })
        .then(isSuccess => {
            restClientGenerator(this.wadlOpts);
            console.log('WADL successfully generated');
        });
    }
}

