'use strict'

var postcss = require('gulp-postcss')
var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var sass = require('gulp-sass')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css')
var del = require('del')
var zip = require('gulp-zip');

sass.compiler = require('node-sass');

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
  return gulp.src(paths.scripts.src + '/libs/**/*')
    .pipe(gulp.dest(paths.scripts.dest + '/lib'))
}

function copyStaticCSS() {
  return gulp.src(paths.styles.src + '/libs/**/*')
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

function styles() {
  var plugins = [
    autoprefixer(),
    cssnano()
  ];
  return gulp.src(paths.styles.src + '/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
  return gulp.src(paths.scripts.src + '/script.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
}

function zipIt() {
  return gulp.src([
    '**',
    '!node_modules',
    '!node_modules/**',
    '!src',
    '!src/**',
    '!dist',
    '!dist/**',
    '!.git',
    '!.gitignore',
    '!gulpfile.js',
    '!package-lock.json'
  ])
    .pipe(zip('tonic2.zip'))
    .pipe(gulp.dest('dest'))
}

var copy = gulp.series(copyStaticCSS, copyStaticJS, copyIMG, copyFonts)
var style = gulp.series(styles)
var script = gulp.parallel(scripts)

var defaults = gulp.series(clean, copy, style, script)
var compress = gulp.series(defaults, gulp.parallel(zipIt))

exports.compress = compress
exports.default = defaults