var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function(cb) {
  gulpSequence('clean', ['iconFont', 'images', 'fonts'], ['compass', 'webpack:development', 'html'], ['watch', 'browserSync'], cb);
});
