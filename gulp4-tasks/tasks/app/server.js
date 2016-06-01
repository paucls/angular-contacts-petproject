'use strict';

module.exports = function (gulp, $) {

    var nodemon = null;

    gulp.task(server);

    function server(cb) {
        var manifest = require('../../../manifest.json');
        var space = $.util.env.space || 'development';
        var environment = manifest.env;
        environment.VCAP_APPLICATION = '{"space_name": "' + space + '"}';
        environment.PORT = 8000;
        environment.LOCAL = true;
        environment.stubs = $.util.env.stubs || 'true';

        if (nodemon) {
            nodemon.emit('restart');
            return cb();
        }

        nodemon = $.nodemon({
            script: 'dist/server.js',
            ignore: ['**/*'],
            execMap: {
                js: 'node --harmony'
            },
            env: environment
        }).on('restart', function () {
            console.log('Restarted server');
            $.browserSync.reload();
        }).on('start', function () {
            if ($.browserSync.active) {
                return;
            }

            $.browserSync({
                files: ['dist/app/css/**/*.css'],
                proxy: 'localhost:' + environment.PORT,
                port: 8001,
                injectChanges: true,
                logPrefix: 'browser-sync',
                notify: true,
                reloadDelay: 250
            });
        })
    }
};
