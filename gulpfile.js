const gulp = require('gulp');
var jest = require('gulp-jest').default;
// Browserify driver.
var browserify = require('browserify');
// Browserify plugin to do transpilation.
var babelify = require('babelify');
// Necessary to invoke Browserify.
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('set-test-node-env', function() {
    return process.env.NODE_ENV = 'test';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('dist', ['set-prod-node-env'], function () {
  var b = browserify({
    entries: './src/index.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify]
  });

  return b.bundle()
    // Name the output file.
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('jest', () => {
  return gulp.src('test').pipe(jest({
    config: {
      "transformIgnorePatterns": ["<rootDir>/dist/", "<rootDir>/node_modules/"],
      "automock": false
    }
  }));
});

gulp.task('default', ['dist']);
