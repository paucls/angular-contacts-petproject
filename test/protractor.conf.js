'use strict';

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var path = require('path');
var dir = path.resolve(path.dirname());

exports.config = {

    params: {
        url: 'http://localhost:8000/',
        profile: 'dev',
        implicitlyWait: 500,
        scriptWait: 20000
    },

    allScriptsTimeout: 11000,

    specs: [
        'e2e/integration/**/*.js'
    ],

    suites: {
        integration: 'e2e/integration/**/*.js',
        journey: 'e2e/journey/**/*.js'
    },

    exclude: [
        'e2e/pageObjects/**/*.js'
    ],

    multiCapabilities: [{
        browserName: 'chrome'
    }],

    directConnect: false,

    plugins: [{
        package: 'protractor-console-plugin',
        logWarnings: false,
        exclude: []
    }],

    onPrepare: function () {
        browser.driver.manage().window().setSize(1440, 900);
        browser.manage().timeouts().implicitlyWait(browser.params.implicitlyWait);
        browser.manage().timeouts().setScriptTimeout(browser.params.scriptWait);

        // Disable animations
        var disableAnimations = function () {
            angular.module('disableAnimations', []).run(['$rootScope',
                function ($rootScope) {
                    $rootScope.disableAnimations = true;
                }]);
        };

        browser.addMockModule('disableAnimations', disableAnimations);

        return browser.getCapabilities().then(function (capabilities) {
            var browserName = capabilities.get('browserName');

            // Configure Html Reporter
            jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
                savePath: dir + '/test_results/e2e/screenshots/' + new Date().getTime() + '/',
                consolidate: true,
                consolidateAll: true,
                filePrefix: browserName + '.' + new Date().getTime() + '.index.html'
            }));
        });
    }
};
