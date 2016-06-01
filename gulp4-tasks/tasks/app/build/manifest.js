'use strict';

module.exports = function (gulp, $) {

    gulp.task(manifest);

    function manifest() {
        return gulp.src(['manifest.json'])
            .pipe($.convert({
                from: 'json',
                to: 'yml'
            }))
            .pipe(gulp.dest('dist/'));
    }
};
