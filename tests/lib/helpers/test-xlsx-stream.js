'use strict'

const array = require( 'stream-array' )
const fs    = require( 'fs' )
/**
 * create File streams for testing
 * @params {Arguments} filenames in tests/lib/fixtures
 * @return {Array} array stream
 */
module.exports = function () {
  // spread arguments into array
  const args = Array.prototype.slice.call( arguments )

  // map streams
  return array( args.map( path => fs.createReadStream( path ) ) )
}
