var gulp   = require('gulp'),
    rimraf = require('rimraf'),
    config = require('../config');

/*
 * Удаление папки buld
 */

gulp.task('clean', function(cb) {
    rimraf(config.clean.development.dest, cb);
});