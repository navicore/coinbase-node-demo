// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['src/js/*.js', '*.js', '!src/js/lodash.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Copy jsx
var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('jsx', function () {
  return gulp.src('src/js/*.jsx')
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('dist/js'));
  });

gulp.task('copy_jsx', function() {
    return gulp.src('src/js/*.jsx')
      .pipe(gulp.dest('dist/js'));
});

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src('node_modules/bootstrap/dist/fonts/g*')
        .pipe(gulp.dest('dist/fonts'));
});

// Copy css
gulp.task('css', function() {
    return gulp.src('node_modules/bootstrap/dist/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('bsjs', function() {
    return gulp.src('node_modules/bootstrap/dist/js/*min.js')
        .pipe(gulp.dest('dist/js'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('js', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Browser Sync
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["dist/**/*.*"],
    browser: "google chrome",
    port: 7000,
  });
});

// Run Server
gulp.task('nodemon', function (cb) {
  return nodemon({
          script: 'bin/www'
  }).on('start', function () {
    cb();
  });
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'js']);
    gulp.watch('src/js/*.jsx', ['jsx']);
    gulp.watch('src/scss/*.scss', ['sass']);
});

// Build Task
gulp.task('build', ['lint', 'fonts', 'css', 'sass', 'js', 'bsjs', 'jsx']);

// Default Task
gulp.task('live', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build', 'watch', 'nodemon']);

