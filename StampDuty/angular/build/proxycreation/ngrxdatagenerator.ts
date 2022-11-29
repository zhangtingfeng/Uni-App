import { NgrxDataDetails, NgrxDataServiceDetails } from "build/config";
import * as util from '../util';
let ngrxDataServiceGenerator = require('./rest-client-generator/ngrx-data-generator');

export class NgrxDataServiceGenerator {
    public async Convert(configDetails: NgrxDataDetails) {
        await util.exec('rimraf', [configDetails.outputPath])
        .then(isSuccess => {
            return util.exec('mkdirp', [configDetails.outputPath]); 
        })
        .then(isSuccess => {
            ngrxDataServiceGenerator(configDetails);
            console.log('Ngrx Data services successfully generated');
        });
    }
}