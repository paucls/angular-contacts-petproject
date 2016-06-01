'use strict';

module.exports = function (gulp, $, config, packageJson, bowerJson, settings) {

    var _ = require('underscore');

    gulp.task(jsVendor);

    function jsVendor() {
        var wiredepConfig = {
            bowerJson: bowerJson,
            exclude: config.wiredepExcludeJs || [],
            devDependencies: true
        };

        var dependencies = $.wiredep(wiredepConfig).js;

        dependencies = (config.minifyVendorJsGlobs || []).concat(dependencies);

        return gulp.src(dependencies)
            .pipe($.ngAnnotate({single_quotes: true}))
            .pipe($.concat('app.vendor.js'))
            .pipe($.rename({suffix: '.min'}))
            .pipe($.if(config.debug, $.uglify({mangle: true, compress: settings.compression})))
            .pipe(gulp.dest('dist/app/js'));
    }
};
