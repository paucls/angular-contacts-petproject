'use strict';

module.exports = function (gulp, $, config) {

    gulp.task(partials);

    function partials() {
        return gulp.src('app/partials/**/*.html')
            .pipe($.angularTemplatecache({'module': config.module, 'root': 'partials'}))
            .pipe($.rename({suffix: '.min'}))
            .pipe($.uglify({mangle: true}))
            .pipe(gulp.dest('dist/app/js'));
    }
};
