'use strict';

var fs = require('fs');
var ejs = require('ejs');
var formatter = require('typescript-formatter/lib/formatter');

var template = ejs.compile(fs.readFileSync(__dirname + '/servicemain.ejs', 'utf8'), {
    filename: __dirname + '/servicemain.ejs'
});

module.exports = function (meta, options) {
    var src = template({
        varPfx: options.internalVariablePrefix,
        moduleName: options.moduleName,
        types: meta.types,
        rootUrl: meta.rootUrl,
        services: meta.services
    }).replace(/&amp;lt;/g, '<')
        .replace(/&amp;gt;/g, '>')
        .replace(/^\s*[\r\n]/gm, '');

    fs.writeFileSync(options.outputFile, src, 'utf8');
}
