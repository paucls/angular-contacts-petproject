'use strict';

module.exports = function (gulp) {

    gulp.task(prepare);

    function prepare() {
        return gulp.src(['package.json', 'manifest.json', 'server.js'])
            .pipe(gulp.dest('./dist/'));
    }
};
