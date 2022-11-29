import { PerformWSDLToTS } from './wsdl-to-ts';
import * as util from '../util';

export class WsdlGenerator {
   public async Convert(inputFile: string, outputPath: string) {
    return await Promise.all([
        PerformWSDLToTS(inputFile, outputPath)
    ]).then(_ => {
        console.log(' successfully generated');
    });
   }
}
