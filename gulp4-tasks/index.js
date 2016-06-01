'use strict';

module.exports = function (gulp, config) {

    var packageJson = require('../package.json'),
        bowerJson = require('../bower.json'),
        settings = require('./settings.json'),
        plugins = require('gulp-load-plugins')({
            pattern: [
                'gulp-*',
                'gulp.*',
                'del',
                'wiredep',
                'ip',
                'protractor-flake',
                'browser-sync',
                'path',
                'versiony',
                'underscore',
                'fs',
                'node-notifier',
                'git-rev'
            ],
            lazy: true
        });

    config.debug = plugins.util.env.debug ? false : true;
    config.maps = plugins.util.env.maps ? true : false;
    config.ciEnvironment = process.env.JENKINS_HOME ? true : false;
    loadGulpTasks('tasks/' + config.type);

    function loadGulpTasks(dir) {
        require('require-directory')(module, dir, {
            visit: function (task) {
                task(gulp, plugins, config || {}, packageJson, bowerJson, settings)
            }
        });
    }
};
