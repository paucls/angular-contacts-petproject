'use strict';

module.exports = function (gulp, $, config) {

    gulp.task(lint);

    function lint() {
        return gulp.src(['app/js/**/*.js', 'test/**/*.js', './server.js'])
            .pipe($.jshint())
            .pipe($.jshint.reporter($.jshintStylish))
            .pipe($.if(config.ciEnvironment, $.jshint.reporter('fail')))
            .pipe($.jscs())
            .pipe($.jscs.reporter())
            .pipe($.if(config.ciEnvironment, $.jscs.reporter('fail')));
    }
};
