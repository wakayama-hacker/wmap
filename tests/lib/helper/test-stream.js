'use strict'

const array = require('stream-array')
const File  = require('vinyl')

/**
 * create File streams for test
 * @return {Array} array stream
 */
module.exports = function () {
  const args = Array.prototype.slice.call(arguments)

  // incremental number to avoid path duplication
  let i = 0

  /**
   * create dummy vinyl Object
   * @param  {String} contents content of a file
   * @return {Vinyl}           vinyl object
   */
  const create = contents => new File({
    cwd: '/home/wacker/',
    base: '/home/wacker/test',
    path: '/home/wacker/test/file' + (i++).toString() + '.extension',
    contents: new Buffer(contents),
    stat: { mode: '0666' }
  })

  return array(args.map(create))
}
