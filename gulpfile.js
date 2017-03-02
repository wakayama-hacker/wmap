var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var csv2json = require('./lib/wnew_csv2json')


gulp.task('js', function (cb) {
  browserify({
    entries: ['src/app.js']
  })
  .bundle()
  .pipe(source('app.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('js'))
  .on('end', cb)
})

gulp.task('csv', () => {
  gulp.src('./data/**/*.csv')
    .pipe(csv2json())
    .pipe(gulp.dest('./json'))
})

gulp.task( 'twitter_bootstrap', function () {
  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css'])
		.pipe( gulp.dest( 'css' ) )
} )

gulp.task('build', ['js', 'csv','twitter_bootstrap'])
