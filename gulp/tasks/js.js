var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    fileinclude = require('gulp-file-include'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    config      = require('../config');

/*
 * Build js
 */

gulp.task('js', [
    'js-internal',
    'js-external',
    'js-all'
]);

gulp.task('js-all', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling js');

    return gulp.src(config.js.srcAll)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.development.dest))
}));

gulp.task('js-internal', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling js');

    return gulp.src(config.js.srcInternal)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.development.dest))
}));

gulp.task('js-external', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling js');

    // jquery делаем отдельно чтобы подключить его в head
    gulp.src(config.js.srcJquery)
        .pipe(gulp.dest(config.js.development.destJquery));

    // html5shiv делаем отдельно чтобы подключить его в head
    gulp.src(config.js.srcHtml5shiv)
        .pipe(gulp.dest(config.js.development.destHtml5shiv));

    return gulp.src(config.js.srcExternal)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.development.dest))
}));
