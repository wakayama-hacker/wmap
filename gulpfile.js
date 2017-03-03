'use strict'

const browserify  = require( 'browserify' )
const buffer      = require( 'vinyl-buffer' )
const csv2json    = require( './lib/gulp-wcsv2json' )
const gulp        = require( 'gulp' )
const riotify     = require( 'riotify' )
const sass        = require( 'gulp-sass' )
const source      = require( 'vinyl-source-stream' )
const streamqueue = require( 'streamqueue' )
const uglify      = require( 'gulp-uglify' )
const xlsx2csv    = require( './lib/gulp-wxlsx2csv' )
const marked      = require( 'gulp-marked' )
const replace     = require( 'gulp-replace' )
const rename      = require( 'gulp-rename' )

gulp.task( 'md', () => {
  gulp.src( 'README.md' )
    .pipe( marked( {} ) )
    // eslint-disable-next-line quotes
    .pipe( replace( /^/, '<home-contents class="home-contents">' + "\n" + '<div class="wrap">' ) )
    // eslint-disable-next-line quotes
    .pipe( replace( /$/, '</div>' + "\n" + '</home-contents>' ) )
    .pipe( rename( ( path ) => {
      path.basename = 'home-contents'
      path.extname = '.tag'
    } ) )
    .pipe( gulp.dest( 'tags' ) )
} )

gulp.task( 'js', [ 'md' ], function ( cb ) {
  browserify( {
    entries: [ 'src/app.js' ]
  } )
  .transform( riotify )
  .bundle()
  .pipe( source( 'app.min.js' ) )
  .pipe( buffer() )
  .pipe( uglify() )
  .pipe( gulp.dest( 'js' ) )
  .on( 'end', cb )
} )

gulp.task( 'data', () => {

  // merge streams of csv and xlsx
  streamqueue(
    { objectMode: true },
    // load csv
    gulp.src( './data/**/*.csv' ),
    // load xlsx and convert
    gulp.src( './data/**/*.xlsx' )
      .pipe( xlsx2csv() )
  )
    .pipe( csv2json() )
    .pipe( gulp.dest( './json' ) )
} )

gulp.task( 'twitter_bootstrap', () => {
  gulp.src( [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
    'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.*'
  ] )
		.pipe( gulp.dest( 'css' ) )
} )

gulp.task( 'fonts', () => {
  gulp.src( [
    'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.*'
  ] )
		.pipe( gulp.dest( 'fonts' ) )
} )

gulp.task( 'sass', () => {
  return gulp.src( './src/style.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './css' ) )
} )

gulp.task( 'build', [ 'js', 'data','twitter_bootstrap', 'sass', 'fonts' ] )
