'use strict'

var gulp = require('gulp')
var browserify = require('browserify')
var riotify    = require('riotify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var csv2json = require('./lib/wnew_csv2json')


gulp.task('js', function (cb) {
  browserify({
    entries: ['src/app.js']
  })
  .transform(riotify)
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

gulp.task( 'twitter_bootstrap', () => {
  gulp.src( [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
    'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.*'
  ] )
		.pipe( gulp.dest( 'css' ) )
} )

gulp.task( 'fonts', () => {
  gulp.src([
    'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.*'
  ])
		.pipe( gulp.dest( 'fonts' ) )
} )

gulp.task( 'sass', () => {
  return gulp.src( './src/style.scss' )
    .pipe( sass().on('error', sass.logError ) )
    .pipe( gulp.dest( './css' ) )
} )

gulp.task( 'build', [ 'js', 'csv','twitter_bootstrap', 'sass', 'fonts' ] )
