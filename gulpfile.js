'use strict';


var gulp = require('gulp'); // Load Gulp!
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require("gulp-babel");


gulp.task("babel", function () {
    return gulp.src("js/main.js")
        .pipe(babel())
        .pipe(gulp.dest("./build/js"));
});

gulp.task('scss', function() {
    gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./scss/**/*.scss', ['scss']);
    gulp.watch('./js/**/*.js', ['babel']);
    gulp.watch(["index.html", "js/*.js", "css/*.css"]).on('change', browserSync.reload);
});




