'use strict';

var fs = require('fs');
var ejs = require('ejs');
var formatter = require('typescript-formatter/lib/formatter');

var template = ejs.compile(fs.readFileSync(__dirname + '/indexeddb.schema.ejs', 'utf8'), {
    filename: __dirname + '/indexeddb.schema.ejs'
});

module.exports = function (services, options) {
    var src = template({
       services: services
    }).replace(/&amp;lt;/g, '<')
        .replace(/&amp;gt;/g, '>')
        .replace(/^\s*[\r\n]/gm, '');

    fs.writeFileSync(options.outputFile, src, 'utf8');
}
