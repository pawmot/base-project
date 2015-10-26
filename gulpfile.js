'use strict';

var gulp = require('gulp');
var debug = require('gulp-debug');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var Config = require('./gulpfile.config');
var tsProject = tsc.createProject('tsconfig.json');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var nodemon = require('nodemon');

var config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
// gulp.task('gen-ts-refs', function () {
//     var target = gulp.src(config.appTypeScriptReferences);
//     var sources = gulp.src([config.allTypeScript], {read: false});
//     return target.pipe(inject(sources, {
//         starttag: '//{',
//         endtag: '//}',
//         transform: function (filepath) {
//             return '/// <reference path="../..' + filepath + '" />';
//         }
//     })).pipe(gulp.dest(config.typings));
// });

gulp.task('ts-lint', function () {
    return gulp.src(config.typeScriptFiles).pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('compile-ts-debug', function () {
    var sourceTsFiles = [config.typeScriptFiles,
                         config.libraryTypeScriptDefinitions];


    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

    tsResult.dts.pipe(gulp.dest(config.sources));
    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(config.sources));
});

gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
                              config.sources +'/**/*.js',
                              config.sources +'/**/*.js.map',
                              '!' + config.bowerComponents
                           ];

  // delete the files
  del(typeScriptGenFiles, cb);
});

gulp.task('watch', function() {
    gulp.watch([config.typeScriptFiles], ['ts-lint', 'compile-ts-debug']);
});

gulp.task('nodemon', function(cb) {
  var started = false;

	return nodemon({
		script: config.startScript,
    nodeArgs: ['--debug']
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('serve', ['nodemon', 'watch'], function() {
  browserSync.init(null, {
    port: 7000,
    proxy: "http://localhost:3000",
    files: [
      './app/public/**/*.*'
    ]
  });
});

gulp.task('default', ['ts-lint', 'compile-ts']);