var gulp = require('gulp');
var sass = require("gulp-sass");
var server = require('browser-sync');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

gulp.task('style', function () {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions",
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('css'))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('css'))
    .pipe(server.reload({ stream: true }));
})

gulp.task('images', function () {
  return gulp.src('img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
})

gulp.task('server', ['style'], function () {
  server.init({
    server: "."
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});
