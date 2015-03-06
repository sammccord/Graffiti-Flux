var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var less = require('gulp-less');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('buildCSS', function () {
    gulp.src('src/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('buildLESS', function () {
    gulp.src('src/less/material.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('compress', function() {
    gulp.src('src/js/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default',['browserify', 'copy', 'buildCSS','buildLESS']);
gulp.task('extensionize',['compress', 'copy', 'buildCSS','buildLESS']);

gulp.task('watch', function() {
    gulp.watch(['src/**/*.*','node_modules/material-ui/src/**/*.*'], ['default']);
});

gulp.task('ext_watch',function(){
    gulp.watch('dist/**/*.*', ['extensionize']);
});


//Browser Action Tasks
gulp.task('bg_browserify', function() {
    gulp.src('bg_src/js/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/browser_action/js'));
});

gulp.task('bg_copy', function() {
    gulp.src('bg_src/index.html')
        .pipe(gulp.dest('dist/browser_action'));
});

gulp.task('bg_buildCSS', function () {
    gulp.src('bg_src/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/browser_action/css'));
});

gulp.task('bg_buildLESS', function () {
    gulp.src('bg_src/less/material.less')
        .pipe(less())
        .pipe(gulp.dest('dist/browser_action/css'));
});

gulp.task('bg_compress', function() {
    gulp.src('bg_src/js/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/browser_action/js'));
});

gulp.task('browser_action',['bg_browserify', 'bg_copy', 'bg_buildCSS','bg_buildLESS']);
gulp.task('bg_extensionize',['bg_compress', 'bg_copy', 'bg_buildCSS','bg_buildLESS']);

gulp.task('bg_watch', function() {
    gulp.watch(['src/**/*.*','node_modules/material-ui/src/**/*.*'], ['default']);
});