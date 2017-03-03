/**
 * Gulp plugin to convert xlsx files into csv files.
 * @file
 */

'use strict'

const through = require( 'through2' )
const path    = require( 'path' )
// const xlsx    = require( 'xlsx' )

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

    const xlsx = file.clone()
    xlsx.path = `${xlsx.base}/${path.basename( xlsx.path, path.extname( xlsx.path ) )}.csv`
    // xlsx()

    this.push( xlsx )
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
