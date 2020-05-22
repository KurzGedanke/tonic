'use strict'

// var postcss = require('gulp-postcss');
var gulp = require('gulp')
// var sourcemaps = require('gulp-sourcemaps');
// var autoprefixer = require('autoprefixer');
// var cssnano = require('cssnano');
// var sass = require('gulp-sass')
// var babel = require('gulp-babel')
// var uglify = require('uglify')
// var cleanCSS = require('gulp-clean-css')
var del = require('del')

var paths = {
  styles: {
    src: 'src/sass',
    dest: 'assets/css'
  },
  scripts: {
    src: 'src/js',
    dest: 'assets/js'
  }
};

function clean() {
  return del([ 'assets' ]);
}

function copyStaticJS() {
  return gulp.src(paths.scripts.src + '/lib/**/*')
    .pipe(gulp.dest(paths.scripts.dest + '/lib'))
}

function copyStaticCSS() {
  return gulp.src(paths.styles.src + '/lib/**/*')
    .pipe(gulp.dest(paths.styles.dest))
}

function copyFonts() {
  return gulp.src('src/font/**/*')
    .pipe(gulp.dest('assets/font'))
}

function copyIMG() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('assets/img'))
}

var copy = gulp.series(copyStaticCSS, copyStaticJS, copyIMG, copyFonts)

exports.default = copy