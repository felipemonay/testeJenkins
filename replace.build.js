var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version;


var moment = require('moment');

today = '.'+moment().format('YYYY-MM-DD-HH-mm-ss');

const options = {
    files: 'src/environments/environment.prod.ts',
    from: /VERSION: (.*)'/g,
    to: "VERSION: '"+ buildVersion + today+ "'",
    allowEmptyPaths: false,
};

try {
    let changedFiles = replace.sync(options);
    console.log(changedFiles)
    if (changedFiles == 0) {
        throw "Please make sure that file '" + options.files + "' has \"version: ''\"";
    }
    console.log('Build version set: ' + buildVersion);
}
catch (error) {
    console.error('Error occurred:', error);
    throw error
}


