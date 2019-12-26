var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    user: "bbiweb",                   // NOTE that this was username in 1.x
    password: "c3513aI092Of00T",           // optional, prompted if none given
    host: "18.213.248.143",
    port: 21,
    localRoot: __dirname+ '/dist/front/' ,
    remoteRoot: '/var/www/tmp/front/',
    // include: ['*', '**/*'],      // this would upload everything except dot files
    include: ['*', '**/*'],
    exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
    deleteRemote: false,              // delete ALL existing files at destination before uploading, if true
    forcePasv: false                 // Passive mode is forced (EPSV command is not sent)
}

// use with promises+
ftpDeploy.deploy(config)
    .then(res => console.log('finished:', res))
    .catch(err => console.log(err))

// use with callback
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err)
    else console.log('finished:', res);
});

ftpDeploy.on('uploading', function(data) {
    data.totalFilesCount;       // total file count being transferred
    data.transferredFileCount; // number of files transferred
    data.filename;             // partial path with filename being uploaded
});
