'use strict';

module.exports = function (gulp, $) {

    gulp.task(clean);

    function clean(cb) {
        return $.del(['./dist'], cb);
    }
};
