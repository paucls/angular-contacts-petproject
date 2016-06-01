'use strict';

module.exports = function (gulp) {

    gulp.task(html);

    function html() {
        return gulp.src(['app/index.html'])
            .pipe(gulp.dest('dist/app'));
    }
};
