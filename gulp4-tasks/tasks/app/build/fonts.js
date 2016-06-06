'use strict';

module.exports = function (gulp) {

    gulp.task(fonts);

    function fonts() {
        return gulp.src(['./bower_components/bootswatch-dist/fonts/*.{eof,svg,ttf,woff,woff2}'])
            .pipe(gulp.dest('./dist/app/fonts'));
    }
};
