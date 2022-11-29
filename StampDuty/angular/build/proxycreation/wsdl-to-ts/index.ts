#!/usr/bin/env node

import { rename, writeFile } from 'fs';
import * as minimist from 'minimist';
import * as mkdirp from 'mkdirp';
import { ITypedWsdl, mergeTypedWsdl, outputTypedWsdl, wsdl2ts } from './wsdl-to-ts';

export interface IConfigObject {
    outdir: string;
    files: string[];
    tslintDisable: null | string[];
    tslintEnable: null | string[];
}


function mkdirpp(dir: string, mode?: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        mkdirp(dir, mode || 0o755, (err, made) => {
            if (err) {
                reject(err);
            } else {
                resolve(made);
            }
        });
    });
}

export function PerformWSDLToTS(inputFile: string, outputFile: string) {
    const config: IConfigObject = { outdir: outputFile, files: [inputFile], tslintDisable: ['max-line-length'], tslintEnable: [] };
    Promise.all(config.files.map(wsdl2ts)).
    then((xs) => mergeTypedWsdl.apply(undefined, xs)).
    then(outputTypedWsdl).
    then((xs: Array<{ file: string, data: string[] }>) => {
        return Promise.all(xs.map((x) => {
            // console.log('-- %s --', x.file);
            // console.log('%s', x.data.join('\n\n'));
            const file = config.outdir + '/' + x.file.toLowerCase();
            const dir = file.replace(/\/[^\/]+$/, '');
            return mkdirpp(dir).then(() => {
                return new Promise((resolve, reject) => {
                    const tsfile = file + '.ts.tmp';
                    const fileData: string[] = [];
                    if (config.tslintEnable === null) {
                        fileData.push('/* tslint:enable */');
                    }
                    if (config.tslintDisable === null) {
                        fileData.push('/* tslint:disable */');
                    } else if (config.tslintDisable.length !== 0) {
                        fileData.push('/* tslint:disable:' + config.tslintDisable.join(' ') + ' */');
                    }
                    if (config.tslintEnable && config.tslintEnable.length !== 0) {
                        fileData.push('/* tslint:enable:' + config.tslintEnable.join(' ') + ' */');
                    }

                    // x.data = x.data.replace(/string/, 'string1');
                    let i = 0;
                    for (let d of x.data) {
                        x.data[i] = d.replace(new RegExp('xs:string', 'g'), 'string')
                                     .replace(new RegExp('xs:boolean', 'g'), 'boolean')
                                     .replace(new RegExp('xs:decimal', 'g'), 'number')
                                     .replace(new RegExp('xs:int', 'g'), 'number')
                                     .replace(new RegExp('xs:long', 'g'), 'number')
                                     .replace(new RegExp('xs:dateTime', 'g'), 'Date');
                        i = i + 1;
                    }

                    fileData.push(x.data.join('\n\n'));
                    fileData.push('');
                    writeFile(tsfile, fileData.join('\n'), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(tsfile);
                        }
                    });
                });
            });
        }));
    }).
    then((files: string[]) => Promise.all(files.map((file) => {
        return new Promise((resolve, reject) => {
            const realFile = file.replace(/\.[^\.]+$/, '');
            rename(file, realFile, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(realFile);
                }
            });
        });
    }))).
    catch((err) => {
        console.error(err);
        process.exitCode = 3;
    });
}

