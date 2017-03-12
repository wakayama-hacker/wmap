/**
 * Gulp plugin to wrap `sharp` library
 * @file
 */

'use strict'

const through = require( 'through2' )
const sharp   = require( 'sharp' )

/**
 * wnew sharp
 * @param {number} width width of sharpen image
 * @return {Stream} [description]
 */
module.exports = function( width ) {

  /**
   * Transform
   * @param  {Vinyl}    file     [description]
   * @param  {string}   encode   [description]
   * @param  {Function} callback [description]
   */
  function transform( file, encode, callback ) {

    file.contents = sharp( file.contents ).resize( width )
    this.push( file )
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
