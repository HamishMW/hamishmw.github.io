// gulpfile.js
var gulp         = require('gulp'),
    express      = require('express'),
    sass         = require('gulp-ruby-sass'),
    shell        = require('gulp-shell'),
    minifycss    = require('gulp-minify-css'),
    minifyHTML   = require('gulp-minify-html'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    livereload   = require('gulp-livereload'),
    prefix       = require('gulp-autoprefixer'),
    lr           = require('tiny-lr'),
    notify       = require('gulp-notify'),
    ghPages      = require('gulp-gh-pages'),
    server       = lr();

// Build stylesheets
gulp.task('sass', function() {
  return sass('_sass/main.scss', { style: 'expanded' })
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(minifycss())
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Build js
gulp.task('scripts', function() {
  return gulp.src(['js/*/*.js', 'js/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Jekyll Build
gulp.task('build', ['sass', 'scripts'], shell.task([ 'jekyll build' ]));

gulp.task('serve', function() {
  var app = express();
  app.use(express.static(__dirname + '/_site', { "no-cache": true }));
  var appserver = app.listen(3000, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(
        'Server listening on http://localhost:%s',
        appserver.address().port
     );
  });
});

// Watch and rebuild on change
gulp.task('watch', function() {
  gulp.watch([
    '*.html',
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_drafts/**/*',
    '_posts/**/*'
  ], ['build']);

  gulp.watch('_sass/**', ['sass']);
  gulp.watch('js/**', ['scripts']);

  livereload.listen();
  gulp.watch(['_site/**']).on('change', livereload.changed);
});

gulp.task('deploy', function() {
  return gulp.src('./_site/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['build', 'serve', 'watch']);