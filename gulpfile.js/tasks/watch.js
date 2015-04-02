var gulp     = require('gulp');
var html     = require('../config/html');
var iconFont = require('../config/iconFont');
var images   = require('../config/images');
var fonts   = require('../config/fonts');
var compass  = require('../config/compass');
var watch    = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  watch(images.src, function() { gulp.start('images'); });
  watch(fonts.src, function() { gulp.start('fonts'); });
  watch(compass.files, function() { gulp.start('compass'); });
  watch(iconFont.src, function() { gulp.start('iconFont'); });
  watch(html.watch, function() { gulp.start('html'); });
});
