'use strict';

var fs = require('fs');
var ejs = require('ejs');
var formatter = require('typescript-formatter/lib/formatter');

var template = ejs.compile(fs.readFileSync(__dirname + '/dataservicemain.ejs', 'utf8'), {
    filename: __dirname + '/dataservicemain.ejs'
});

module.exports = function (serviceElement, options) {
    var src = template({
       service: serviceElement
    }).replace(/&amp;lt;/g, '<')
        .replace(/&amp;gt;/g, '>')
        .replace(/^\s*[\r\n]/gm, '');

    fs.writeFileSync(options.outputFile, src, 'utf8');
}
