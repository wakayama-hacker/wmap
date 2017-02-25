'use strict'

/**
 * Gulp plugin to split a csv file into json files.
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
 * @param  {Vinyl} file  input
 * @param  {Object} opts Options
 * @return {Object}      summarized file values
 */
const csvFile2json = (file, opts) => {

  // get single file input, so far
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
  const inputs = []

  /**
   * Transform
   * @param  {Vinyl}    file     [description]
   * @param  {String}   encode   [description]
   * @param  {Function} callback [description]
   * @return {void}              [description]
   */
  function transform(file, encode, callback) {
    inputs.push(file)
    callback()
  }

  /**
   * Flush
   * @param  {Function} callback [description]
   * @return {Void}              [description]
   */
  function flush(callback) {

    // obtain [{ menu: {}, items: [], origin: <File> }]
    const sources = inputs.map(input => csvFile2json(input, OPTS))
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

    // push and send as a file stream
    const menuFile = origin.clone()
    menuFile.contents = new Buffer(JSON.stringify(menus))
    menuFile.path = `${menuFile.base}/${OPTS.menuHeader}.${OPTS.extension}`
    this.push(menuFile)

    // integrate item data
    menus.map(menu => sources
      // array of array of items from Vinyl
      .map(sources => sources.items
        // filter by menu for each menus
        .filter(item => item.fileBaseName === menu)
        .map(item => item.data)
      )
      // flatten
      .reduce((a, b) => a.concat(b), [])
      // push and send as a file stream for each items
      .map(item => {
        const itemFile = origin.clone()
        itemFile.contents = new Buffer(JSON.stringify(item))
        itemFile.path = `${itemFile.base}/${menu}.${OPTS.extension}`
        this.push(itemFile)
      })
    )

    callback()
  }

  return through.obj(transform, flush)
}
