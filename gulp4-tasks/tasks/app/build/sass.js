'use strict';

module.exports = function (gulp, $, config) {

    gulp.task(sass);

    function sass() {
        require('es6-promise').polyfill();

        return gulp.src('./sass/**/*.scss', {allowEmpty: true})
            .pipe($.compass({
                config_file: './config.rb',
                css: 'dist/app/css'
            }))
            .pipe($.autoprefixer({
                browsers: ['last 2 versions', '> 5%'],
                cascade: false
            }))
            .pipe(gulp.dest('./dist/app/css'));
    }
};
