var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    nano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create()

gulp.task('styles', function () {
  gulp.src('scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        style: 'compressed',
        errLogToConsole: false,
        onError: function(err) {
            return notify().write(err);
        }
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(nano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static'))
    .pipe(browserSync.stream())
});

gulp.task('serve', function() {
    browserSync.init({
      server: { baseDir: './' }
    });

    gulp.watch('scss/style.scss', ['styles']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

