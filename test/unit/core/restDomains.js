'use strict';

var manifest = require('../../../manifest.json'),
    interpolate = require('interpolate'),
    _ = require('underscore');

angular.module('contacts-ui.core').constant('RestDomains', (function () {

    _.map(manifest.env, function (val, key) {
        manifest.env[key] = interpolate(val || '', {
            space: 'dev'
        });
    });

    return manifest.env;
})());
