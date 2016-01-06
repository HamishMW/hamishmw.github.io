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
    server       = lr();
    gulp         = require('gulp');
    imagemin     = require('gulp-imagemin');
    pngquant     = require('imagemin-pngquant');

// Build stylesheets
gulp.task('sass', function() {
  return sass('src/sass/main.scss', {
    style: 'expanded',
    errLogToConsole: false,
    onError: function(err) {
        return notify().write(err);
    }})
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(minifycss())
    .pipe(gulp.dest('_site/dist/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Build js
gulp.task('scripts', function() {
  return gulp.src(['src/js/vendor/*', 'src/js/*'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_site/dist/js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Compress images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Jekyll Build
gulp.task('build', ['sass', 'scripts', 'images'], shell.task([ 'jekyll build' ]));

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
    '_includes/**/*',
    '_layouts/**/*.html',
    '_drafts/**/*',
    '_posts/**/*'
  ], ['build']);

  gulp.watch('src/sass/**/*', ['sass']);
  gulp.watch('src/js/**/*', ['scripts']);
  gulp.watch('src/img/**/*', ['images']);

  livereload.listen();
  gulp.watch(['_site/**']).on('change', livereload.changed);
});

gulp.task('default', ['build', 'serve', 'watch']);