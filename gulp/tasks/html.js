var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    fileinclude = require('gulp-file-include'),
    config      = require('../config');

/*
 * Build html
 */

gulp.task('html', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling html');

    return gulp.src(config.html.src)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        .pipe(gulp.dest(config.html.dest))
}));