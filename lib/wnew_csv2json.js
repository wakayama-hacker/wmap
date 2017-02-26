'use strict'

/**
 * Gulp plugin to convert csv files into json files.
 * @file
 */

const through = require('through2')

/**
 * DEFAULT OPTION VALUES
 */
const ROW_SEPARATOR_DEFAULT = '\n'
const COL_SEPARATOR_DEFAULT = ','
const MENU_HEADER_DEFAULT   = 'menu'
const EXTENSION_DEFAULT     = 'json'

/**
 * Convert vinyl File object into JSON with necessary informations
 * @param  {Vinyl}  file input
 * @param  {Object} opts options
 * @return {Object}      summarized file values
 */
const csvFile2json = (file, opts) => {

  // get single file input
  const cont = file.contents.toString()

  // convert csv to arrays
  const rows = cont.split(opts.rowSeparator)

  const indexOfMenu = rows[0].split(opts.colSeparator).indexOf(opts.menuHeader)

  // split and prepare header values as keys
  const header = rows[0]
    .split(opts.colSeparator)
    .filter(col => col !== opts.menuHeader) // ignore actual menu value of 'menu'

  // resting rows for body
  const body = rows.splice(1)
    .filter(row => row !== '')
    .map(row => row.split(opts.colSeparator))

  // aggregate values of menu column
  const menus = body
    .map(cols => cols[indexOfMenu])
    .filter((menu, index, cols) => (
      // make unique
      cols.indexOf(menu) === index &&
      // eliminate negative field
      !!menu &&
      // invalid filed
      menu !== opts.menuHeader
    ))

  menus.sort()

  // create item json without menu
  const items = menus.map(menu => body
    // iterate with each 'menu' field
    .filter(cols => cols[indexOfMenu] === menu)
    // eliminate 'menu' collumn
    .map(cols => cols.filter((col, index) => index !== indexOfMenu))
    // create json combining header and col
    .map(cols => {
      const result = {}
      header.map((col, index) => {
        result[header[index]] = cols[index]
      })
      return result
    })
  )

  return {
    menu: {
      fileName: `${opts.menuHeader}.${opts.extension}`,
      data: menus
    },
    items: items.map((item, index) => ({
      fileName: `${menus[index]}.${opts.extension}`,
      fileBaseName: menus[index],
      data: item
    })),
    origin: file
  }
}

/**
 * wnew csv2json
 * @return {Stream} [description]
 */
module.exports = function(opts) {

  // parse options
  const OPTS = {
    rowSeparator : (opts && opts.rowSeparator) || ROW_SEPARATOR_DEFAULT,
    colSeparator : (opts && opts.colSeparator) || COL_SEPARATOR_DEFAULT,
    menuHeader   : (opts && opts.menuHeader)   || MENU_HEADER_DEFAULT,
    extension    : (opts && opts.extension)    || EXTENSION_DEFAULT,
  }

  // container
  const sources = []

  /**
   * Transform
   * @param  {Vinyl}    file     [description]
   * @param  {String}   encode   [description]
   * @param  {Function} callback [description]
   * @return {void}              [description]
   */
  function transform(file, encode, callback) {
    // Aggregate informations about all files and wait to flush
    sources.push(csvFile2json(file, OPTS))
    callback()
  }

  /**
   * Flush
   * @param  {Function} callback [description]
   * @return {Void}              [description]
   */
  function flush(callback) {

    // Pick 1st ekement as original, being cloned
    const origin  = sources[0].origin

    // integrate menu data
    const menus = sources
      // array of array of menu
      .map(source => source.menu.data)
      // flatten [['串本', '田辺'], ['白浜', '田辺']]
      .reduce((a, b) => a.concat(b), [])
      // make unique
      .filter((elem, index, arr) => arr.indexOf(elem) === index)

    menus.sort()

    // push and send menu list as a file stream
    const menuFile = origin.clone()
    menuFile.contents = new Buffer(JSON.stringify(menus))
    menuFile.path = `${menuFile.base}/${OPTS.menuHeader}.${OPTS.extension}`
    this.push(menuFile)

    // flatten items
    const result = {}
    sources.forEach(source => {
      source.items.forEach(item => {
        const key = item.fileBaseName
        if (!result[key]) { result[key] = [] }
        item.data.forEach(datum => result[key].push(datum))
      })
    })

    // push and send item lists as file streams
    Object.keys(result).forEach(key => {
      const itemFile = origin.clone()
      itemFile.contents = new Buffer(JSON.stringify(result[key]))
      itemFile.path = `${itemFile.base}/${key}.${OPTS.extension}`
      this.push(itemFile)
    })

    callback()
  }

  return through.obj(transform, flush)
}
