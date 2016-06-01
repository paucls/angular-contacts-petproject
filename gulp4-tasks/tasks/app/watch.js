'use strict';

module.exports = function (gulp) {

    const WATCH_OPTIONS = {interval: 1000, usePolling: true};

    gulp.task(watch);

    gulp.task('build', gulp.series(
        gulp.parallel('prepare', 'image', 'jsMinify', 'manifest', 'html')
    ));

    gulp.task('dist', gulp.series('clean', gulp.parallel('jsVendor', 'cssVendor', 'partials', 'stubs', 'factories', 'sass', 'build')));

    gulp.task('default',
        gulp.series('clean',
            gulp.parallel('jsVendor', 'cssVendor', 'partials', 'stubs', 'factories', 'sass', 'build'),
            gulp.parallel('server', 'watch')
        ));

    function watch() {
        gulp.watch([
                '!app/js/stubs/**/*.js',
                '!app/js/factories/**/*.js',
                'app/*.js',
                'app/js/**/*.js'
            ], WATCH_OPTIONS, gulp.series('jsMinify', 'server', 'lint')
        );

        gulp.watch([
                'app/index.html'
            ], WATCH_OPTIONS, gulp.series('prepare', 'server')
        );

        // Templates
        gulp.watch([
                'app/partials/**/*.html'
            ], WATCH_OPTIONS, gulp.series('partials', 'server')
        );

        // SASS
        gulp.watch([
            'sass/**/*.scss'
        ], WATCH_OPTIONS, gulp.series('sass'));

        // Stubs
        gulp.watch([
            'app/js/stubs/**/*.js'
        ], WATCH_OPTIONS, gulp.series('stubs', 'server', 'lint'));

        // Fixture Factories
        gulp.watch([
            'app/js/factories/**/*.js'
        ], WATCH_OPTIONS, gulp.series('factories', 'server', 'lint'));

        // Test
        gulp.watch([
            'test/**/*.js'
        ], WATCH_OPTIONS, gulp.series('lint'));
    }
};
