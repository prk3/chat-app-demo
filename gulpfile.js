
const gulp = require('gulp')
const babelify = require('babelify')
const browserify = require('browserify')
const stream = require('vinyl-source-stream')


gulp.task('compile-client', () =>

  browserify()
    .add('./src/client/app.js')
    .transform(babelify, {
      presets: ['env', 'react']
    })
    .bundle()
    .on('error', function (error) {
      console.error('\n' + error + '\n')
      this.emit('end')
    })
    .pipe(stream('app.js'))
    .pipe(gulp.dest('./public/js/'))
)


gulp.task('watch-client', () =>
  gulp.watch(['!src/**/*.test.js', 'src/client/**/*.js'], ['compile-client'])
)


gulp.task('default', ['watch-client'])

