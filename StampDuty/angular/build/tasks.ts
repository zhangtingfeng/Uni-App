import * as fs from 'fs';
import { writeFile } from 'fs-extra';
import { ngPackagr } from 'ng-packagr';
import { relative } from 'path';
import { Bundler } from 'scss-bundle';
import { Config } from './config';
import { WadlGenerator } from './proxycreation/wadlgenerator';
import { WsdlGenerator } from './proxycreation/wsdlgenerator';
import { NgrxDataServiceGenerator } from './proxycreation/ngrxdatagenerator';
import * as util from './util';

const fileSystem = require('fs-extra');
const tempFileName = './dist/current.txt';

/**
 * Cleans the top level dist folder. All npm-ready packages are created
 * in the dist folder.
 */
export async function removeDistFolder(config: Config) {
    if (config.incremental || (config.projectName !== '' && config.projectName !== undefined && config.projectName !== null)) {
        return new Promise((resolve, reject) => {
            return resolve('incremental build inititalized');
        });
    }
    return util.exec('rimraf', ['./dist']);
}

export async function generateWSDLProxyDetails(config: Config) {
    if (config.skipProxyCreation) {
        return new Promise((resolve, reject) => {
            return resolve('skipping WSDL proxy creation');
        });
    }
    for (let proxyDetails of config.wsdl) {
        let wsdlGenerator = new WsdlGenerator();
        await wsdlGenerator.Convert(proxyDetails.sourcePath, proxyDetails.destinationFolder);
    }
}

export async function generateWADLProxyDetails(config: Config) {
    if (config.skipProxyCreation) {
        return new Promise((resolve, reject) => {
            return resolve('skipping WADL proxy creation');
        });
    }
    for (let proxyDetails of config.wadl) {
        let wadlGenerator = new WadlGenerator();
        await wadlGenerator.Convert(proxyDetails.sourcePath, proxyDetails.destinationFolder, proxyDetails.moduleName, proxyDetails.isModuleService, proxyDetails.includeModuleNameToKey);
    }
}

export async function generateNgrxDataServices(config: Config) {
    if (config.skipProxyCreation) {
        return new Promise((resolve, reject) => {
            return resolve('skipping ngrx Data services creation');
        });
    }

    let ngrxDataServiceGenerator = new NgrxDataServiceGenerator();
    await ngrxDataServiceGenerator.Convert(config.ngrxDataServices);

} 

export async function generateDocumentationUsingCompoDoc(config: Config) {
    if (config.skipDocumentation) {
        return new Promise((resolve, reject) => {
            return resolve('skipping Documentation generation');
        });
    }
    for (let documentation of config.documentation) {
        await util.cmd('npx ', [` compodoc -c ${documentation.path}`]);
    }
}
   
export async function compilePackagesWithNgc(config: Config) {
    let pkgs = util.getTopLevelPackages(config);
    const testPkgs = util.getTestingPackages(config);
    if (config.projectName !== '' && config.projectName !== undefined && config.projectName !== null) {
        pkgs = [config.projectName];
    } else if (config.incremental && fs.existsSync(tempFileName)) {
        const currentProject = await util.readFile(tempFileName);
        pkgs = pkgs.slice(pkgs.findIndex(x => x.indexOf(currentProject) >= 0) + 1);
    }

    for (let packageName of pkgs) {
        let packageDetails = config.packages.filter(x => x.name === packageName)[0];
        let relativePath = packageDetails.relativePath;
        if (relativePath !== undefined && relativePath !== null && relativePath !== '') {
            await compilePackagesWithSCSS(packageName, relativePath);
        } else {
            await _compilePackagesusingNode(packageName, (config.productionMode && packageDetails.isProductionMode ? ' --prod --configuration=production ' : ''), packageDetails.baseHref);
        }
    }
}


export const isWatchMode = !!process.env.WATCH_MODE;


export async function compilePackagesWithSCSS(packageName: string, basePath: string) {
    await ngPackagr()
        .forProject('./' + basePath + 'ng-package.json')
        .withTsConfig('./' + basePath + 'tsconfig.lib.json')
        .withOptions({
            watch: isWatchMode
        })
        .build();
    await bundleScss(packageName, basePath).then(_ => {
        util.writeFile(tempFileName, packageName);
    });
}

/** Bundles all SCSS files into a single file */
async function bundleScss(projectName: string, basePath: string) {
    // tslint:disable-next-line:no-console
    console.info('Starting Bundling SCSS');

    await new Bundler()
        .bundle('./' + basePath + 'src/lib/theming/_all-theme.scss', ['./' + basePath + 'src/**/*.scss'])
        .then(value => {
            let imports = value.imports;
            let bundledContent = value.bundledContent;
            let found = value.found;
            if (imports) {
                const cwd = process.cwd();

                const filesNotFound = imports
                    .filter(x => !x.found)
                    .map(x => relative(cwd, x.filePath));

                if (filesNotFound.length) {
                    console.error(`SCSS imports failed \n\n${filesNotFound.join('\n - ')}\n`);
                    throw new Error('One or more SCSS imports failed');
                }
            }

            if (found) {
                let outputFile = './dist/' + projectName + '/_theming.scss';
                writeFile(outputFile, bundledContent)
                    .then(x => {
                        // tslint:disable-next-line:no-console
                        console.log('Writing completed!');
                    });
            }

        })
        .then(_ => {
            // tslint:disable-next-line:no-console
            console.info('Finished Bundling SCSS');
        });
  

}


export async function packModulesWithYarn(config: Config) {
    const PACKAGE_PATH = '.\\dist\\packages\\';
    if (!fs.existsSync(`${PACKAGE_PATH}`)) {
        fs.mkdirSync(`${PACKAGE_PATH}`);
    }

    // await util.cmd('mkdir', [`${PACKAGE_PATH}`]);
    let pkgs = util.getTopLevelPackages(config);
    if (config.projectName !== '' && config.projectName !== undefined && config.projectName !== null) {
        pkgs = [config.projectName];
    }
    for (let packageName of pkgs) {
        await _createPackAndCopyToOutputPath(packageName, config.isLinuxEnvironment);
    }
}

async function _createPackAndCopyToOutputPath(pkg: string, isLinuxEnvironment: boolean) {
    const DIST_PACKAGE_DIR = `./dist/${pkg}`;
    await process.chdir(`${DIST_PACKAGE_DIR}`);
    await util.cmd('yarn', [`pack --filename=${pkg}.tgz`]);
    if(isLinuxEnvironment)
        await util.cmd('mv', [' **.tgz ../../packages/']);
    else
        await util.cmd('move', [' **.tgz .\\..\\packages\\']);
    await process.chdir('../../');
}

async function _compilePackagesusingNode(pkg: string, mode: string = '', baseHref: string = '') {
    let command = ` --max_old_space_size=10240 node_modules/@angular/cli/bin/ng build  ${mode} --project=${pkg} `;
    if(baseHref != null && baseHref != undefined && baseHref != '')
        command = ` --max_old_space_size=10240 node_modules/@angular/cli/bin/ng build  ${mode} --project=${pkg} --base-href=/${baseHref}/`;
    await util.cmd('node ', [command]).then(_ => {
        util.writeFile(tempFileName, pkg);
    });
}

async function _compilePackages(pkg: string, mode: string = '') {
    await util.cmd('ng ', [` build  ${mode} --project=${pkg}`]).then(_ => {
        util.writeFile(tempFileName, pkg);
    });
}


/**
 * Deploy build artifacts to repos
 */
export async function publishToRepo(config: Config) {
    console.log(config.registryUrl);
    if (config.registryUrl === undefined || config.registryUrl === '') {
        return;
    }
    const SOURCE_DIR = `./dist/packages`;
    await process.chdir(`${SOURCE_DIR}`);
    for (let pkg of util.getTopLevelPackages(config)) {
        await util.cmd('npm publish', [`${pkg}.tgz`, `--registry=${config.registryUrl}`]);
    }
}

export function mapAsync<T>(
    list: T[],
    mapFn: (v: T, i: number) => Promise<any>
) {
    return Promise.all(list.map(mapFn));
}




export async function copyFilesForDocker(config: Config) {
    try {
        await fileSystem.copy('./../digital101/dist/hawkeyeclient/', './../../target/userinterface/hawkeyeclient/');
         await fileSystem.copy('./../digital101/dist/chatbot/', './../../target/userinterface/chatbot/');
        await fileSystem.copy('./../digital101/dist/developerguide/', './../../target/userinterface/developerguide/');
        // tslint:disable-next-line:no-console
        console.log('success!');
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
    }
}
