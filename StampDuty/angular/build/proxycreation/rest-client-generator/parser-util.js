'use sctrict';

var _ = require('lodash');
var request = require('request');
var fs = require('fs');

const urlRegExp = /^http[s]?.*$/;

function format(value, capitalize) {
    tempValue = value.split(':');
    value = tempValue.length > 1 ? tempValue[1] : tempValue[0];
    value = _.camelCase(value);
    if (capitalize) {
        value = _.upperFirst(value);
    }
    return value;
}

function fetchFile(filePath) {
    return new Promise(function (resolve, reject) {
        if (urlRegExp.test(filePath)) {
            request({
                url: filePath,
                strictSSL: false
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject({
                            code: response.statusCode,
                            message: response.statusMessage
                        });
                    }
                }
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }
    }.bind(this));
}

module.exports.format = format;
module.exports.urlRegExp = urlRegExp;
module.exports.fetchFile = fetchFile;
