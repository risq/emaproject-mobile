var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var compass      = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var config       = require('../config/compass');


var compass = require('gulp-compass');

gulp.task('compass', function() {
    return gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(compass(config.settings))
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});
