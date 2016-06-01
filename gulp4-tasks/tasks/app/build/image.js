'use strict';

module.exports = function (gulp) {

    gulp.task(image);

    function image() {
        return gulp.src(['./app/img/**/*.*'])
            .pipe(gulp.dest('./dist/app/img'));
    }
};
