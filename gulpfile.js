var gulp = require('gulp');
var sass = require("gulp-sass");
var server = require('browser-sync');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');

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
    .pipe(server.reload({ stream: true }));
})

gulp.task('server', ['style'], function () {
  server.init({
    server: "."
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});
