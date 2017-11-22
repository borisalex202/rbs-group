var gulp   = require('gulp'),
    watch  = require('gulp-watch'),
    config = require('../config');

/*
 * Смотрим за изменениями
 */

gulp.task('watch', function(){
    watch([config.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch(config.watch.sassInternal, function(event, cb) {
        gulp.start('sass-internal');
    });
    watch([config.watch.sassExternal], function(event, cb) {
        gulp.start('sass-external');
    });
    watch(config.watch.jsAll, function(event, cb) {
        gulp.start('js-all');
    });
    watch(config.watch.jsInternal, function(event, cb) {
        gulp.start('js-internal');
    });
    watch([config.watch.jsExternal], function(event, cb) {
        gulp.start('js-external');
    });
    watch([config.watch.images], function(event, cb) {
        gulp.start('images');
    });
    watch([config.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});
