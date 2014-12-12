var gulp         = require('gulp');
var utils        = require('gulp-util');
var sass         = require('gulp-ruby-sass');
var csso         = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync');


gulp.task('sass', function() {
  return gulp.src('./app/src/styles/app.sass')
    .pipe(plumber())
    .pipe(sass({
      style: 'compressed',
      precision: 3
    }))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 version', 'ie 9', 'android 4', 'ios 6'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./app/dist/styles'));
});


gulp.task('jshint', function() {
  return gulp.src([ 'gulpfile.js', './app/src/scripts/**/*.js' ])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});


gulp.task('browserify', ['jshint'], function() {
  var bundler = browserify({
    entries: ['./app/src/scripts/app.js'],
    debug: true
  });

  var bundle = function() {
      return bundler
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./app/dist/scripts'));
    };

  return bundle();
});


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './app'
    }
  });
});


gulp.task('default', [ 'sass', 'browserify' ]);


var feedback = function(event) {
    console.log( 'File '+ utils.colors.yellow(event.path) +' was '+ event.type );
};

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('./app/src/styles/*.sass', [ 'sass', browserSync.reload ]).on('change', feedback);
  gulp.watch('./app/src/scripts/{**,}/*.js', [ 'browserify', browserSync.reload ]).on('change', feedback);
});
