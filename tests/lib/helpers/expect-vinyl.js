/**
 * Assertion helpers for vinyl Object
 * @file
 */
'use strict'

const expect = require( 'expect.js' )
const path   = require( 'path' )

/**
 * create a callback to check if the given Vinyl has a certain filename
 * @param  {Vinyl}   file [description]
 * @param  {string}  name [description]
 * @return {Function}       [description]
 */
const hasName = name => file => expect( file.path ).to.equal( `${file.base}/${name}` )

/**
 * create a callback to check if the given Vinyl has a certain json string
 * @param  {Vinyl}   file [description]
 * @param  {Object}  json [description]
 * @return {Function}       [description]
 */
const isJSON = json => file => expect( file.contents.toString() ).to.equal( JSON.stringify( json ) )

/**
* create a callback to check if the given Vinyl has a certain extension in its filename
 * @param  {string}  ext [description]
 * @return {Function}     [description]
 */
const hasExtension = ext => file => expect( path.extname( file.path ) ).to.equal( `.${ext}` )

module.exports = { hasName, hasExtension, isJSON }
