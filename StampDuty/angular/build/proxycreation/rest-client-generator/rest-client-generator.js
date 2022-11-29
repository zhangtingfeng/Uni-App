'use strict';

var wadlParser = require('./wadl-parser');
var swagger2Parser = require('./swagger2-parser');

module.exports = function (options) {
    var opts = {
        input: '',
        outputFile: 'services.ts',
        platform: 'angular2-ts', //[angular2-ts | angular2-dart | dojo2-ts]
        rootUrl: '',
        defaultServiceName: '',
        capitalize: true,
        propertynameCapitalize: false,
        serviceSuffix: '',
        serviceExclude: '',
        methodExclude: '',
        moduleName: 'ServiceModule',
        internalVariablePrefix: '_',
        isModuleService: false,
        includeModuleNameToKey: false
    };

    for (var opt in opts) {
        if (options[opt] !== undefined) {
            opts[opt] = options[opt];
        }
    }

    var metaPromise;

    if (opts.input.endsWith('.wadl')) {
        console.log('Reading WADL from %s', opts.input);
        metaPromise = wadlParser(opts);
    } else {
        console.log('Reading Swagger from %s', opts.input);
        metaPromise = swagger2Parser(opts);
    }

    return metaPromise.then(function (meta) {

        console.log('Definition successfully parsed, found %d services', meta.services.length);

        console.log('Generating sources for platform %s', opts.platform);
        var serializer = require('./serializer/' + opts.platform);
        var individualServiceSerializer = require('./serializer/' + opts.platform + '/individualservice.js');
        var moduleindividualServiceSerializer = require('./serializer/' + opts.platform + '/moduleservice/moduleindividualservice.js');
        var moduleindividualServiceInterfaceSerializer = require('./serializer/' + opts.platform + '/moduleservice/interface/moduleindividualserviceinterface.js');

        var typeSerializer = require('./serializer/' + opts.platform + '/types.js');
        var originalOutputFilepath = opts.outputFile;
        meta.services.forEach(element => {
            var serviceMeta = {
                rootUrl: meta.rootUrl,    
                services: [element], 
                types: []
            };

            var serviceOpts = {
                input: opts.input,
                outputFile: opts.outputFile + element.name + '.ts',
                platform: opts.platform, 
                rootUrl: opts.rootUrl,
                defaultServiceName: opts.defaultServiceName,
                capitalize: opts.capitalize,
                propertynameCapitalize: opts.propertynameCapitalize,
                serviceSuffix: opts.serviceSuffix,
                serviceExclude: opts.serviceExclude,
                methodExclude: opts.methodExclude,
                moduleName: opts.moduleName,
                internalVariablePrefix: opts.internalVariablePrefix,
                includeModuleNameToKey: opts.includeModuleNameToKey
            };
            
            if(opts.isModuleService){
                moduleindividualServiceSerializer(serviceMeta, serviceOpts);

                var serviceOptsForInterface = {
                    input: opts.input,
                    outputFile: opts.outputFile + 'I' + element.name + '.ts',
                    platform: opts.platform, 
                    rootUrl: opts.rootUrl,
                    defaultServiceName: opts.defaultServiceName,
                    capitalize: opts.capitalize,
                    propertynameCapitalize: opts.propertynameCapitalize,
                    serviceSuffix: opts.serviceSuffix,
                    serviceExclude: opts.serviceExclude,
                    methodExclude: opts.methodExclude,
                    moduleName: opts.moduleName,
                    internalVariablePrefix: opts.internalVariablePrefix,
                    includeModuleNameToKey: opts.includeModuleNameToKey
                };
                
                moduleindividualServiceInterfaceSerializer(serviceMeta, serviceOptsForInterface);
                console.log('REST client was successfully generated to %s', serviceOptsForInterface.outputFile);
            }
            else{
                individualServiceSerializer(serviceMeta, serviceOpts);
            }

            console.log('REST client was successfully generated to %s', serviceOpts.outputFile);
        });

        opts.outputFile = originalOutputFilepath + 'ServiceTypes.ts';
        typeSerializer(meta, opts);

        // opts.outputFile = originalOutputFilepath + opts.moduleName + 'Service.ts';
        // serializer(meta, opts);
        console.log('REST client was successfully generated to %s', opts.outputFile);

    }, function (err) {
        console.log(err);
    });
};
