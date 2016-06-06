'use strict';

var cfenv = require('cfenv');
var manifest = require('./manifest.json');
var _ = require('underscore');
var interpolate = require('interpolate');
var express = require('express');
var mustacheExpress = require('mustache-express');
var glob = require('glob-all');
var compression = require('compression');

var appEnv = cfenv.getAppEnv();
var app = express();

var gatewayName = process.env.LOCAL ? 'contacts-gateway' : 'axm';

var gatewayMap = {
    'development': '//dev-' + gatewayName + '.apps.petproject.com',
    'CIT': '//cit-' + gatewayName + '.apps.petproject.com',
    'QA': '//qa-' + gatewayName + '.apps.petproject.com'
};

var port = appEnv.port || 8000;

app.use(compression({level: 9, threshold: 0}));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/app');

app.use('/js', express.static(__dirname + '/app/js'));
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/fonts', express.static(__dirname + '/app/fonts'));
app.use('/img', express.static(__dirname + '/app/img'));
app.use('/partials', express.static(__dirname + '/app/partials'));

var stubs = process.env.stubs === 'true' ? 'js/stubs/**/*.js' : '!js/stubs/**/*.js';

// Get glob files
var localJsFiles = glob.sync([
    'js/*.js',
    stubs
], {cwd: __dirname + '/app/'});

var localCssFiles = glob.sync([
    'css/**/*.css'
], {cwd: __dirname + '/app/'});

app.all('/*', function (req, res) {
    var space = (JSON.parse(process.env.VCAP_APPLICATION || '{}') || {}).space_name || 'local';

    // If we're on cloudfoundry, we need the baseUrl as we'll be hitting the ui through the gateway
    var baseUrl = (process.env.LOCAL || process.env.stubs) ? '' : process.env.baseUrl;

    // Get rest domains
    var restDomains = _.map(manifest.env, function (val, key) {

        let url = interpolate(process.env[key] || '', {
            gateway: gatewayMap[space]
        });

        return {key: key, url: url};
    });

    var renderWith = {
        localJsFiles: localJsFiles,
        localCssFiles: localCssFiles,
        space: space,
        restDomains: restDomains,
        baseUrl: baseUrl
    };

    res.render('index', renderWith);
});

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});
