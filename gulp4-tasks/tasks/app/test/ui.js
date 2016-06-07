'use strict';

module.exports = function (gulp, $) {

    var syncExec = require('sync-exec');

    gulp.task(ui);

    function ui(done) {
        var path = require('path'),
            manifest = require('../../../../manifest.json'),
            dir = path.resolve(path.dirname()),
            space = $.util.env.space || 'development',
            suite = $.util.env.suite || 'integration',
            url = $.util.env.url || 'http://localhost:9000/',
            testUsername = $.util.env.testUserName || 'username',
            testPassword = $.util.env.testPassword || 'pass',
            profile = $.util.env.profile || 'dev',
            maxAttempts = $.util.env.retries || (suite === 'journey' ? 1 : 2),
            environment = manifest.env;

        $.util.log($.util.colors.green('Checking webdriver, This may take a while if no webdriver is found'));
        syncExec('node ./node_modules/protractor/bin/webdriver-manager update --ignore_ssl=true');

        environment.VCAP_APPLICATION = '{"space_name": "' + space + '"}';
        environment.VCAP_APP_PORT = 9000;
        environment.LOCAL = true;
        environment.stubs = $.util.env.stubs || 'true';

        var server = $.nodemon({
            script: dir + '/dist/server.js',
            execMap: {
                js: 'node --harmony'
            },
            ignore: ['**/*'],
            env: environment
        });

        $.protractorFlake({
            maxAttempts: maxAttempts,
            nodeBin: 'node',
            protractorPath: './node_modules/protractor',
            protractorArgs: ['./test/protractor.conf.js',
                '--params.url=' + url,
                '--params.profile=' + profile,
                '--params.testUsername=' + testUsername,
                '--params.testPassword=' + testPassword,
                '--suite=' + suite]
        }, function (status) {
            server.emit('quit');
            server.once('exit', function () {
                done();
                process.exit(status);
            });
        });
    }
};
