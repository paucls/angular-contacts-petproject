'use strict';

var wiredepConfig = {
    devDependencies: true
};

var vendordeps = require('wiredep')(wiredepConfig).js;

var files = vendordeps.concat([
    {pattern: 'test/unit/**/restDomains.js', included: false},
    'app/js/**/*.module.js',
    'app/js/**/*.js',
    'app/partials/**/*.html',
    'test/unit/**/*.js'
]);

module.exports = function (config) {
    config.set({

        files: files,

        preprocessors: {
            'app/js/!(factories)/**/*.js': ['coverage'],
            'app/js/**/*.js': ['babel'],
            'test/unit/**/*.js': ['babel'],
            'app/partials/**/*.html': ['ng-html2js'],
            'test/unit/**/restDomains.js': ['browserify']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/'
        },

        exclude: [
            'app/js/stubs/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine', 'browserify'],

        browsers: ['PhantomJS_CUSTOM'],

        reporters: ['progress', 'coverage', 'junit'],

        customLaunchers: {
            PhantomJS_CUSTOM: {
                base: 'PhantomJS',
                flags: [
                    '--web-security=false',
                    '--load-images=false'
                ]
            }
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },

        coverageReporter: {
            instrumenters: {isparta: require('isparta')},
            instrumenter: {
                'app/js/**/*.js': 'isparta'
            },
            instrumenterOptions: {
                isparta: {},
                istanbul: {noCompact: true}
            },
            reporters: [
                {type: 'html', dir: 'test_results/coverage/', subdir: 'html'},
                {type: 'text-summary'},
                {type: 'cobertura', dir: 'test_results/coverage/', subdir: 'cobertura'},
                {type: 'json', dir: 'test_results/coverage/', subdir: 'json'},
                {type: 'lcov', dir: 'test_results/coverage/', subdir: 'lcov'}
            ]
        },

        junitReporter: {
            outputDir: 'test_results/unit',
            suite: 'unit'
        }
    });
};
