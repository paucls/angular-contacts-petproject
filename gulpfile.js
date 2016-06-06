'use strict';

var gulp = require('gulp');

require('./gulp4-tasks')(gulp, {
    type: 'app',
    codeBase: 'app',
    module: 'contacts-ui',
    wiredepExcludeJs: [/jasmine/],
    minifyJsGlobs: [
        'app/js/app.module.js',
        'app/js/**/*.module.js',
        'app/js/**/*.route.js'
    ],
    minifyVendorJsGlobs: [
        'bower_components/jquery/dist/jquery.min.js'
    ],
    wiredepExcludeCss: ['ladda.min.css'],
    minifyVendorCssGlobs: [
        'bower_components/bootswatch-dist/css/bootstrap.min.css',
        'bower_components/ladda/dist/ladda-themeless.min.css'
    ],
    sonarExcludeCoverage: ',app/js/**/*.route.js,app/js/app.module.js,app/js/app.config.js',
    sonarExcludeDuplication: ',test/**/*'
});
