'use strict'

const through = require('through2')

module.exports = function() {
  function transform(file, encode, callback) {
    const cont = file.contents.toString()

    // CSV to JSON

    file.contents = new Buffer(cont)
    this.push(file)
    callback()
  }

  function flush(callback) {
    callback()
  }

  return through.obj(transform, flush)
}
