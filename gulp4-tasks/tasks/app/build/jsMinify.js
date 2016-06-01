'use strict';

module.exports = function (gulp, $, config, packageJson, bowerJson, settings) {

    var _ = require('underscore');

    gulp.task(jsMinify);

    function jsMinify() {
        var source = (config.minifyJsGlobs || []).concat([
            'app/js/**/*.js',
            '!app/js/factories/**/*.js',
            '!app/js/stubs/**/*.js'
        ]);

        return gulp.src(source)
            .pipe($.if(config.maps, $.sourcemaps.init()))
            .pipe($.iife())
            .pipe($.babel({
                presets: ['es2015']
            }))
            .pipe($.ngAnnotate({single_quotes: true}))
            .pipe($.concat('main.js'))
            .pipe($.rename({suffix: '.min'}))
            .pipe($.if(config.debug, $.uglify({mangle: true, compress: settings.compression})))
            .pipe($.if(config.maps, $.sourcemaps.write()))
            .pipe(gulp.dest('dist/app/js'));
    }
};
