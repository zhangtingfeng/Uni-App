/*
File to rename the starterkit and the component creation in the presentation folder.
*/

let dirpath = '/';
let name = '';
let search = '';


let args = process.argv.slice(2).filter(function (arg) {
  if (arg.toLowerCase().indexOf('--destinationpath') >= 0) {
    dirpath = arg.split('=')[1].trim();
  } else if (arg.toLowerCase().indexOf('--name') >= 0) {
    name = arg.split('=')[1].trim();
  }
});

console.log('dirpath - ' + dirpath);
console.log('name - ' + name);


var glob = require("glob"),
  path = require("path"),
  fs = require("fs"),
  fsextra = require("fs-extra");

const replace = require('replace-in-file');

var folderpath = "";

if (dirpath == "/") {
  folderpath = __dirname + "/**/*.*";
  search = 'starterkit';
} else {
  folderpath = dirpath + "/**/*.*";
  search = 'componenttemplate';
  fsextra.copySync("build/createcomponentscript/componenttemplate", path.join(dirpath, name.toLowerCase() + "/"));
}

const match = RegExp(search, 'gi');

console.log(folderpath);

const results = replace.sync({
  files: folderpath,
  from: match,
  to: name,
  ignore: ['**/node_modules/**', '**/dist/**', '**/localpackages/**', '**/setname.js']
});
console.log('replaced content');


const files = glob(folderpath, { ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/localpackages/**'] }, function (err, files) {
  var processed = 0;
  console.log(__dirname + "/" + folderpath);
  files.forEach(function (file) {
    var dir = path.dirname(file);
    var dirname = path.basename(dir);
    var stats = fs.statSync(dir);

    var filename = path.basename(file);
    var newfilename = filename.replace(search, name);
    stats = fs.statSync(file);

    if (stats.isFile) {
      fs.renameSync(file, dir + "/" + newfilename.toLowerCase());
    }
    processed++;
  });
  console.log(processed + " files processed");
});

if (dirpath == "/") {
  if (fs.existsSync(path.join(__dirname, '/packages/applications/starterkit/'), path.join(__dirname, '/packages/applications/' + name.toLowerCase()))) 
  {
    fs.renameSync(path.join(__dirname, '/packages/applications/starterkit/'), path.join(__dirname, '/packages/applications/' + name.toLowerCase()));
  }
  if (fs.existsSync(path.join(__dirname, '/packages/modules/starterkitdashboard/'), path.join(__dirname, '/packages/modules/' + name.toLowerCase() + 'dashboard'))) 
  {
    fs.renameSync(path.join(__dirname, '/packages/modules/starterkitdashboard/'), path.join(__dirname, '/packages/modules/' + name.toLowerCase() + 'dashboard'));
  }
  
}