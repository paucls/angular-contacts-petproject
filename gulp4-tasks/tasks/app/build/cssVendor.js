'use strict';

module.exports = function (gulp, $, config, packageJson, bowerJson) {

    var _ = require('underscore');

    gulp.task(cssVendor);

    function cssVendor() {

        var wiredepConfig = {
            bowerJson: bowerJson,
            exclude: (config.wiredepExcludeCss || [])
        };

        var dependencies = $.wiredep(wiredepConfig).css;

        dependencies = (config.minifyVendorCssGlobs || []).concat(dependencies);

        return gulp.src(dependencies)
            .pipe($.concat('vendor.css'))
            .pipe($.cssmin())
            .pipe($.rename({suffix: '.min'}))
            .pipe(gulp.dest('./dist/app/css'));
    }
};
