'use strict'

/**
 * Gulp plugin to split a csv file into json files.
 * @file
 */

const through = require('through2')

const ROW_SEPARATOR = '\n'
const COL_SEPARATOR = ','
const MENU_HEADER   = 'menu'
const MENU_FILENAME = `${MENU_HEADER}.json`


/**
 * wnew csv2json
 * @return {Stream} [description]
 */
module.exports = function() {

  /**
   * Transform
   * @param  {Vinyl}    file     [description]
   * @param  {String}   encode   [description]
   * @param  {Function} callback [description]
   * @return {void}              [description]
   */
  function transform(file, encode, callback) {

    // get single file input, so far
    const cont = file.contents.toString()

    // convert csv into nested array
    const rows = cont.split(ROW_SEPARATOR)

    const indexOfMenu = rows[0].split(COL_SEPARATOR).indexOf(MENU_HEADER)

    const header = rows[0]
      .split(COL_SEPARATOR)
      .filter(col => col !== MENU_HEADER) // ignore actual menu value of 'value'

    const body = rows.splice(1)
      .filter(row => row !== '')
      .map(row => row.split(COL_SEPARATOR))

    // aggregate values of menu column
    const menus = body
      .map(cols => cols[indexOfMenu])
      // make unique
      .filter((menu, index, cols) => cols.indexOf(menu) === index)
      // eliminate negative field or invalid filed
      .filter(col => !!col && col !== MENU_HEADER)

    menus.sort()

    // create main json without menu
    const mains = menus.map(menu => body
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

    // make sure to get 2 files output as vinyl object
    // create menu.json
    const menuFile = file.clone()
    menuFile.contents = new Buffer(JSON.stringify(menus))
    menuFile.path = `${menuFile.base}/${MENU_FILENAME}`
    this.push(menuFile)

    // create all main.json
    mains.map((main, index) => {
      const mainFile = file.clone()
      mainFile.contents = new Buffer(JSON.stringify(main))
      mainFile.path = `${mainFile.base}/${menus[index]}.json`
      this.push(mainFile)
    })

    callback()
  }

  /**
   * Flush
   * @param  {Function} callback [description]
   * @return {Void}              [description]
   */
  function flush(callback) {
    callback()
  }

  return through.obj(transform, flush)
}
