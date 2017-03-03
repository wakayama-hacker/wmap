'use strict'

const assert      = require( 'stream-assert' )
const xlsx2csv    = require( '../../lib/gulp-wxlsx2csv' )
const test        = require( './helpers/test-xlsx-stream' )
const expectVinyl = require( './helpers/expect-vinyl' )
const hasName    = expectVinyl.hasName
const hasContent = expectVinyl.hasContent

describe( 'gulp-xlsx2csv', () => {

  it( 'should return single file', done => {

    test( '和歌山.xlsx' ) // read from fixture
      .pipe( xlsx2csv() )
      .pipe( assert.length( 3 ) )
      .pipe( assert.end( done ) )
  } )

  it( 'should return file named {xlsxname}_{sheetname}.csv', done => {

    test( '和歌山.xlsx' )
      .pipe( xlsx2csv() )
      .pipe( assert.nth( 0, hasName( '和歌山_Sheet1.csv' ) ) )
      .pipe( assert.nth( 1, hasName( '和歌山_Sheet2.csv' ) ) )
      .pipe( assert.nth( 2, hasName( '和歌山_Sheet3.csv' ) ) )
      .pipe( assert.end( done ) )
  } )


  it( 'should return appropriate contents', done => {

    const csv0 =
      'menu,title,lat,lng,content\n' +
      '和歌山,和歌山城,34.228099,135.171519,和歌山城です。\n'
    const csv1 =
      'menu,title,lat,lng,content\n' +
      '和歌山,片男波,34.228099,135.171519,片男波です。\n'
    const csv2 = ''

    test( '和歌山.xlsx' )
      .pipe( xlsx2csv() )
      .pipe( assert.nth( 0, hasContent( csv0 ) ) )
      .pipe( assert.nth( 1, hasContent( csv1 ) ) )
      .pipe( assert.nth( 2, hasContent( csv2 ) ) )
      .pipe( assert.end( done ) )
  } )

  it( 'should handle error in case of non parsable file', done => {
    test( 'notexcel.xlsx' )
      .pipe( xlsx2csv() )
      .on( 'error',() => done() )
  } )

} )
