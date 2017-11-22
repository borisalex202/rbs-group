var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    postcss     = require('gulp-postcss'),
    svg         = require('postcss-svg'),
    prefixer    = require('gulp-autoprefixer'),
    cssmin      = require('gulp-minify-css'),
    sass        = require('gulp-sass'),
    config      = require('../config');

/*
 * Компиляция SASS в CSS
 * Создание sourcemaps
 * Минификация
 */

gulp.task('sass', [
    'sass-internal',
    'sass-external',
    'sass-proging'
]);

var processors = [
    svg(config.svg.icons)
];

gulp.task('sass-proging', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling sass');

    return gulp.src('./src/sass/proging.scss')
        .pipe(sass(config.sass.options).on('error', error))
        .pipe(postcss(processors))
        .pipe(prefixer(config.autoprefixer))
        .pipe(gulp.dest('./build/css/'))
}));
gulp.task('sass-internal', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling sass');

    return gulp.src(config.sass.srcInternal)
        .pipe(sass(config.sass.options).on('error', error))
        .pipe(postcss(processors))
        .pipe(prefixer(config.autoprefixer))
        .pipe(gulp.dest(config.sass.development.dest))
}));
gulp.task('sass-external', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling sass');

    return gulp.src(config.sass.srcExternal)
        .pipe(sass(config.sass.options).on('error', error))
        .pipe(cssmin())
        .pipe(gulp.dest(config.sass.development.dest))
}));
