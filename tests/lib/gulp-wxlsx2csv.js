'use strict'

const assert      = require( 'stream-assert' )
const xlsx2csv    = require( '../../lib/gulp-wxlsx2csv' )
const test        = require( './helpers/test-xlsx-stream' )
const expectVinyl = require( './helpers/expect-vinyl' )
const hasExtension = expectVinyl.hasExtension

describe( 'gulp-xlsx2csv', () => {

  describe( 'file input', () => {

    it( 'should return single file', done => {
      test( '和歌山.xlsx' )
        .pipe( xlsx2csv() )
        .pipe( assert.length( 1 ) )
        .pipe( assert.end( done ) )
    } )

    it( 'should return file named .csv', done => {
      test( '和歌山.xlsx' )
        .pipe( xlsx2csv() )
        .pipe( assert.first( hasExtension( 'csv' ) ) )
        .pipe( assert.end( done ) )
    } )
  } )
} )
