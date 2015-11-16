'use strict';


var gulp = require('gulp'); // Load Gulp!
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('webpack-stream');

var jsSrc = 'js';
var jsDest = 'build/js';


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

gulp.task('webpack', function() {
    return gulp.src(jsSrc)
        .pipe(webpack({
            entry: {
                main: './js/main.js'
            },
            watch: true,
            output: {
                publicPath: 'js/',
                filename: 'main.js'
            },
            module: {
                loaders: [{
                    test: /\.js?$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader'
                }]
            }
        }))
        .pipe(gulp.dest(jsDest))
});


