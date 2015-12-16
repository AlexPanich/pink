'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-combine-media-queries'),
    csscomb = require('gulp-csscomb'),
    imagemin = require('gulp-imagemin'),
    copy  = require('gulp-copy'),
    newer = require('gulp-newer'),
    clean = require('gulp-dest-clean'),
    rename = require('gulp-rename'),
    minifyHtml = require('gulp-minify-html'),
    replace = require('gulp-replace'),
    uglifyInline = require('gulp-uglify-inline'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    svgstore=require('gulp-svgstore'),
    minifyCss = require('gulp-minify-css');

gulp.task('build:css', ['build:clean'], function() {
  return gulp.src('src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 2 versions', 'ie 10']
          }))
        .pipe(cmq())
        .pipe(csscomb())
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('build:html', ['build:clean'], function() {
  return gulp.src("src/*.html")
        .pipe(replace(/style.css/g, 'style.min.css'))
        .pipe(minifyHtml())
        .pipe(uglifyInline())
        .pipe(gulp.dest('build'));
});

gulp.task('csscomb', function() {
  return gulp.src('src/sass/**/*.scss')
        .pipe(csscomb())
        .pipe(gulp.dest('src/sass'));
});


gulp.task('build:image', ['build:clean'], function() {
  return gulp.src('src/img/**/*')
        .pipe(newer('build'))
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

gulp.task('build:clean', function() {
  return gulp.src(['src/{img,js}/**/*', 'src/*.html'])
        .pipe(clean('build'));
})

gulp.task('build:js', ['build:clean'], function() {
  return gulp.src('src/js/**/*')
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('build/js'));
})

gulp.task('build',['build:clean','build:html', 'build:css', 'build:image', 'build:js'])

gulp.task('build:start', function() {
  browserSync({
    server: {
      baseDir: './build'
    },
    port: 8080,
    open: true,
    notify: false
  })
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './src'
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('css', function() {
  return gulp.src('src/sass/**/*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream:true}));
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*')
        .pipe(concat('script.js'))
        .pipe(reload({stream:true}));
});

gulp.task('watcher', function() {
  gulp.watch('src/sass/**/*', ['css']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/js/**/*', ['js']);
});

gulp.task('default', ['watcher', 'css','browserSync']);

gulp.task('svgstore', function() {
  return gulp.src('src/img/svgsprite/*.svg')
        .pipe(svgstore())
        .pipe(gulp.dest('src/img/svgsprite'));
})