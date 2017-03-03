'use strict'

const array  = require( 'stream-array' )
const fs     = require( 'fs' )
const File   = require( 'vinyl' )


/**
 * create File streams for testing
 * @params {Arguments} filenames in tests/lib/fixtures
 * @return {Array} array stream
 */
module.exports = function () {
  // spread arguments into array
  const args = Array.prototype.slice.call( arguments )

  /**
   * create dummy vinyl Object
   * @param  {string} contents content of a file
   * @return {Vinyl}           vinyl object
   */
  const create = filename => new File( {
    cwd: '/home/wacker/',
    base: `${ __dirname }/../fixtures/`,
    path: `${ __dirname }/../fixtures/${ filename }`,
    contents: new Buffer( fs.readFileSync( `${ __dirname }/../fixtures/${ filename }` ) ),
    stat: { mode: '0666' }
  } )

  // map streams
  return array( args.map( create ) )
}
