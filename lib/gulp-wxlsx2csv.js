/**
 * Gulp plugin to convert xlsx files into csv files.
 * @file
 */

'use strict'

const through = require( 'through2' )
const path    = require( 'path' )
const XLSX    = require( 'xlsx' )

/**
 * wnew csv2json
 * @return {Stream} [description]
 */
module.exports = function() {

  /**
   * Transform
   * @param  {Vinyl}    file     [description]
   * @param  {string}   encode   [description]
   * @param  {Function} callback [description]
   */
  function transform( file, encode, callback ) {

    // parse excel file
    let workbook
    try {
      workbook = XLSX.readFile( file.path )
    } catch ( e ) {
      this.emit( 'error', e )
    }

    // return files
    Object.keys( workbook.Sheets ).forEach( sheetName => {
      const contents = XLSX.utils.sheet_to_csv( workbook.Sheets[sheetName] )
      const csvpath = `${file.base}/${path.basename( file.path, path.extname( file.path ) )}_${ sheetName }.csv`

      const csv = file.clone()
      csv.path = csvpath
      csv.contents = new Buffer( contents )
      this.push( csv )
    } )

    return callback()
  }

  /**
   * Flush
   * @param  {Function} callback [description]
   * @return {Void}              [description]
   */
  function flush( callback ) {
    return callback()
  }

  return through.obj( transform, flush )
}
