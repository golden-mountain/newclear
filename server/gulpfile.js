var gulp = require("gulp"),
  // sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel"),
  // concat = require("gulp-concat"),
  nodemon = require('gulp-nodemon'),
  Cache = require('gulp-file-cache'),
  eslint = require('gulp-eslint'),
  run = require('run-sequence'),
  istanbul = require('gulp-babel-istanbul'),
  injectModules = require('gulp-inject-modules'),
  mocha = require('gulp-mocha');

var cache = new Cache();

/**
 * Compile and cache source code in src directory
 * And set it in dist folder.
 */
gulp.task('compile', function () {
  return gulp.src('src/**/*.js') // your ES2015 code
    .pipe(cache.filter())            // remember files
    // .pipe(sourcemaps.init())
    .pipe(babel())                   // compile new ones
    // .pipe(concat("all.js"))
    // .pipe(sourcemaps.write("."))
    .pipe(cache.cache())             // cache them
    .pipe(gulp.dest('dist'));        // write them
});

/**
 * Linting the code, try to find potential of not bad practice writing and unity code.
 */
gulp.task('lint', function () {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src([ 'src/**/*.js','!node_modules/**' ])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe(eslint.failAfterError());
});

/**
 * Watch changes live in src directory files and auto reload the web server,
 * For every watch execution run lint and compile task.
 */
gulp.task('watch', function () {
  return nodemon({
    script: 'dist/'      // run ES5 code
    , watch: 'src'       // watch ES2015 code
    , tasks: [ 'lint', 'compile' ] // compile synchronously onChange
  });
});

/**
 * Package all source code and build it (lint, compile, watch) development mode.
 */
gulp.task('build', function (done) {
  run('lint', 'compile', 'watch', function () {
    done();
  });
});

/**
 * Coverage our test files.
 */
gulp.task('coverage', function (done) {
  return gulp.src('src/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())
    .on('finish', function () {
      gulp.src('test/**/*.js')
        .pipe(babel())
        .pipe(injectModules())
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
        .on('end', done);
    });
});

/**
 * Run and lift web server with our application in build.
 */
gulp.task('default', [ 'build' ]);
