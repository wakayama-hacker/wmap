'use strict'

const through = require('through2')

const ROW_SEPARATOR = '\n'
const COL_SEPARATOR = ','

module.exports = function() {
  function transform(file, encode, callback) {
    // get single file input, so far
    const cont = file.contents.toString()

    // csv into nested array
    const rows = cont.split(ROW_SEPARATOR)

    const indexOfMenu = rows[0].indexOf('menu')

    const header = rows[0]
      .split(COL_SEPARATOR)
      .filter(col => col !== 'menu')

    const body = rows.splice(1)
      .filter(row => row !== '')
      .map(row => row.split(COL_SEPARATOR))

    // aggregate values of menu column
    const menus = body
      .map(cols => cols[indexOfMenu])
      .filter((col, index, cols) => cols.indexOf(col) === index)

    // create main json without menu
    const main = body
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


    // make sure to get 2 files output as vinyl object
    const file_1st = file          // menu.json
    const file_2nd = file.clone()  // 串本.json

    file_1st.contents = new Buffer(JSON.stringify(menus))
    file_2nd.contents = new Buffer(JSON.stringify(main))

    this.push(file_1st)
    this.push(file_2nd)
    callback()
  }

  function flush(callback) {
    callback()
  }

  return through.obj(transform, flush)
}
