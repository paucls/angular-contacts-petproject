'use strict';

module.exports = function (gulp, $, config, packageJson, bowerJson, settings) {

    gulp.task(factories);

    function factories() {
        return gulp.src('app/js/factories/**/*.js')
            .pipe($.if(config.maps, $.sourcemaps.init()))
            .pipe($.iife())
            .pipe($.babel({
                presets: ['es2015']
            }))
            .pipe($.ngAnnotate({single_quotes: true}))
            .pipe($.concat('app.factories.js'))
            .pipe($.rename({suffix: '.min'}))
            .pipe($.uglify({mangle: true, compress: settings.compression}))
            .pipe($.if(config.maps, $.sourcemaps.write()))
            .pipe(gulp.dest('dist/app/js/stubs'));
    }
};
