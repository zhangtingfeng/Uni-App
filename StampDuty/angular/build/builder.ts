import * as tasks from './tasks';
import { createBuilder } from './util';

export default createBuilder([
  ['Removing "./dist" Folder', tasks.removeDistFolder],
  ['Generate Typescript Definition from Swagger', tasks.generateWADLProxyDetails],
  ['Generate Typescript Definition from Swagger', tasks.generateWSDLProxyDetails],
  ['Generate Ngrx Data Services', tasks.generateNgrxDataServices],
  ['Compiling the projects', tasks.compilePackagesWithNgc],
  // ['Generating documentation for the projects', tasks.generateDocumentationUsingCompoDoc],
  ['Packing the modules', tasks.packModulesWithYarn],
  //['Copying files for docker', tasks.copyFilesForDocker]
]);
