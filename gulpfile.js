var gulp = require('gulp'),
    del = require('del'),
    merge = require('merge-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload.bind(null, {stream: true});


function watch(glob, tasks) {
  require('gulp-watch')(glob, function (files, cb) {
    gulp.start(tasks, cb);
  });
}


gulp.task('build', ['pages', 'assets']);

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});


gulp.task('pages', function () {
  return gulp.src('pages/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(reload());
});

gulp.task('blocks', ['blocks:styles', 'blocks:scripts', 'blocks:images']);

gulp.task('assets', ['blocks', 'images']);

gulp.task('blocks:styles', function () {
  return gulp.src(['blocks/util/**/*.scss', 'blocks/base/**/*.scss', 'blocks/main/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true, precision: 10}))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(gulp.dest('dist/assets'))
    .pipe(reload());
});

gulp.task('blocks:scripts', function () {
  return gulp.src(['blocks/util/**/*.js', 'blocks/base/**/*.js', 'blocks/main/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(gulp.dest('dist/assets'))
    .pipe(reload());
});

gulp.task('blocks:images', function () {
  return gulp.src(['blocks/base/**/*.{jpg,png}', 'blocks/main/**/*.{jpg,png}'])
    .pipe(flatten())
    .pipe(gulp.dest('dist/assets'))
    .pipe(reload());
});

gulp.task('images', function () {
  return gulp.src(['images/**/*'])
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(reload());
});


gulp.task('serve', ['watch'], function (cb) {
  browsersync({
    server: {
      baseDir: 'dist'
    },
    open: false
  }, cb);
});

gulp.task('watch', ['build'], function () {
  watch('pages/**/*', ['pages']);
  watch('blocks/**/*.scss', ['blocks:styles']);
  watch('blocks/**/*.js', ['blocks:scripts']);
  watch('blocks/**/*.{jpg,png}', ['blocks:images']);
  watch('images/**/*', ['images']);
});


gulp.task('default', ['build']);
