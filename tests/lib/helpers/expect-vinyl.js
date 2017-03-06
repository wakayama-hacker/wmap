/**
 * Assertion helpers for vinyl Object
 * @file
 */
'use strict'

const expect = require( 'expect.js' )
const path = require( 'path' )

/**
 * create a callback to check if the given Vinyl has a certain filename
 * @param  {Vinyl}   file [description]
 * @param  {string, regex}  name name or regex pattern
 * @return {Function}       [description]
 */
const hasName = name => file => {
  const basename = path.basename( file.path )
  if ( typeof name === 'string' ) {
    return expect( basename ).to.equal( name )
  } else if ( name instanceof RegExp ) {
    return expect( basename ).to.match( name )
  } else {
    throw new Error( 'Invalid argument type name. Provide `string` as file name or `RegExp` as file name pattern' )
  }
}

/**
 * create a callback to check if the given Vinyl has a certain json string
 * @param  {Vinyl}   file [description]
 * @param  {Object}  json [description]
 * @return {Function}       [description]
 */
const isJSON = json => file => expect( file.contents.toString() ).to.equal( JSON.stringify( json ) )

/**
* create a callback to check if the given Vinyl has a certain content string
* @param  {Vinyl}   file [description]
* @param  {string}  content [description]
* @return {Function}       [description]
 */
const hasContent = content => file => expect( file.contents.toString() ).to.equal( content )

module.exports = { hasName, isJSON, hasContent }
