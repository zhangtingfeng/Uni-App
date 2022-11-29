'use strict';



module.exports = function (configDetails) {

    let metaPromise = new Promise(function (resolve, reject) {
        resolve(configDetails);
    });

    return metaPromise.then(function (ngrxConfigDetails) {

        var individualngrxDataServiceSerializer = require('./serializer/angular2-ts/dataservice/dataservice.js');
        ngrxConfigDetails.services.forEach(element => {
            var serviceOpts = {
                outputFile: ngrxConfigDetails.outputPath + element.name + 'DataService.ts',
            };
            individualngrxDataServiceSerializer(element, serviceOpts);
            console.log('NGRX Data service client was successfully generated to %s', serviceOpts.outputFile);
        });

        var indexeddbschemaGenerator = require('./serializer/angular2-ts/dataservice/indexeddb.schema.js');
        var serviceOpts = {
            outputFile: ngrxConfigDetails.outputPath +  'indexeddb.schema.ts',
        };
        indexeddbschemaGenerator(ngrxConfigDetails.services, serviceOpts)
        console.log('IndexedDB schema was successfully generated to %s', serviceOpts.outputFile);
    }, function (err) {
        console.log(err);
    });
};
