var gulp   = require('gulp'),
    config = require('../config');

/*
 * Копируем ширфты
 */

gulp.task('fonts', function() {
    gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.development.dest))
});
