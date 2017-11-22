var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    config      = require('../config');

config.imagemin.use = [pngquant()];

/*
 * Сжатие картинок
 */

gulp.task('images', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling images');

    return gulp.src(config.images.src)
        .pipe(imagemin(config.imagemin).on('error', error))
        .pipe(gulp.dest(config.images.development.dest))
}));