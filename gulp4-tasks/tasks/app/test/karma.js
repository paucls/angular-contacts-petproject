'use strict';

module.exports = function (gulp, $, config) {

    gulp.task(karma);

    function karma(done) {
        var Server = require('karma').Server;
        var path = require('path');
        var dir = path.resolve(path.dirname());
        var watch = $.util.env.watch || $.util.env.w;

        new Server({
            configFile: dir + '/karma.conf.js',
            singleRun: !watch
        }, function () {
            done();
        }).on('run_complete', function (browsers, results) {
            if (results.failed !== 0) {
                done();

                if (config.ciEnvironment) {
                    process.exit(1);
                }
            }
        }).start();
    }
};
