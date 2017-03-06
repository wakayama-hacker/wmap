/**
 * Gulp plugin to convert csv files into json files.
 * @file
 */

'use strict'

const through = require( 'through2' )
const parse   = require( 'csv-parse' )
const crypto  = require( 'crypto' )

/**
 * [getMd5sum description]
 * @param  {string} key hash seed
 * @return {string}     hash value
 */
const getMd5sum = key => crypto.createHash( 'md5' ).update( key, 'utf8' ).digest( 'hex' )

/**
 * DEFAULT OPTION VALUES
 */
const CAT_HEADER_VALUE_DEFAULT = 'menu'
const EXTENSION_DEFAULT        = 'json'

/**
 * wnew csv2json
 * @return {Stream} [description]
 */
module.exports = function( opts ) {

  // parse options
  const OPTS = {
    category  : ( opts && opts.category )  || CAT_HEADER_VALUE_DEFAULT,
    extension : ( opts && opts.extension ) || EXTENSION_DEFAULT,
  }

  // contain values before flash()
  const data = {
    origin  : undefined,
    sources : []
  }

  /**
   * Transform
   * Convert vinyl File object into JSON with necessary informations
   * Aggregate informations about all files and wait to flush
   * @param  {Vinyl}    file     [description]
   * @param  {string}   encode   [description]
   * @param  {Function} callback [description]
   */
  function transform( file, encode, callback ) {

    // convert csv text into nested arrays, sometimes being jaggy
    parse( file.contents.toString(), ( err, rows ) => {

      // handle parsing error
      if ( err ) {
        this.emit( 'error', err )
        return callback()
      }

      // empty csv should be evaluated as [[]], not []
      if ( rows.length < 1 ) { rows = [ [] ] }

      // define identifier for category column ('menu' as default)
      const indexOfMenu = rows[0].indexOf( OPTS.category )

      // get header values as keys
      const header = rows[0]
        // ignore actual menu value of 'menu'
        .filter( col => col !== OPTS.category )

      // get resting rows for body
      const body = rows.splice( 1 )
        .filter( row => row !== '' )

      // aggregate values of menu column
      const menus = body
        .map( cols => cols[indexOfMenu] )
        .filter( ( menu, index, cols ) => (
          // make unique
          cols.indexOf( menu ) === index &&
          // eliminate negatively evaluated field
          !!menu &&
          // invalid filed
          menu !== OPTS.category
        ) )
        .sort()

      // create item json without category column ('menu' as default)
      const items = menus.map( menu => body
        // iterate with each category value ('menu' column as default)
        .filter( cols => cols[indexOfMenu] === menu )
        // eliminate category collumn
        .map( cols => cols.filter( ( col, index ) => index !== indexOfMenu ) )
        // create json combining header and col
        .map( cols => {
          const result = {}
          header.map( ( col, index ) => {
            result[header[index]] = cols[index]
          } )
          return result
        } )
      )

      // aggregated informations on file
      const result = {
        menu: {
          fileName : `${OPTS.category}.${OPTS.extension}`,
          data     : menus
        },
        items: items.map( ( item, index ) => ( {
          fileName     : `${menus[index]}.${OPTS.extension}`,
          fileBaseName : menus[index],
          data: item
        } ) )
      }
      // store informations
      if ( !data.origin ) {
        data.origin = file
      }
      data.sources.push( result )
      return callback()
    } )
  }


  /**
   * Flush
   * @param  {Function} callback [description]
   * @return {Void}              [description]
   */
  function flush( callback ) {

    // container for index:hash map
    const theHash = {}

    // integrate menu data
    const menus = data.sources
      // array of array of menu
      .map( source => source.menu.data )
      // flatten [['串本', '田辺'], ['白浜', '田辺']]
      .reduce( ( a, b ) => a.concat( b ), [] )
      // make unique
      .filter( ( elem, index, arr ) => arr.indexOf( elem ) === index )
      .sort()

    // map array of menu into object with incremental id
    const mappedMenu = menus.reduce( ( result, menu, index ) => {
      const key = ( menu + Date.now() ).toString()
      const hash = getMd5sum( key )
      // keep index:hash map
      theHash[index] = hash
      result.push( { id: hash, value: menu } )
      return result
    }, [] )

    // push and send menu list as a file stream
    const menuFile = data.origin.clone()
    menuFile.contents = new Buffer( JSON.stringify( mappedMenu ) )
    menuFile.path = `${menuFile.base}/${OPTS.category}.${OPTS.extension}`
    this.push( menuFile )

    // flatten items
    const result = {}
    data.sources.forEach( source => {
      source.items.forEach( item => {
        const key = item.fileBaseName
        if ( !result[key] ) { result[key] = [] }
        item.data.forEach( datum => result[key].push( datum ) )
      } )
    } )

    // push and send item lists as file streams
    Object.keys( result ).forEach( key => {
      const itemFile = data.origin.clone()
      itemFile.contents = new Buffer( JSON.stringify( result[key] ) )
      itemFile.path = `${itemFile.base}/${theHash[menus.indexOf( key )]}.${OPTS.extension}`
      this.push( itemFile )
    } )

    return callback()
  }

  return through.obj( transform, flush )
}
