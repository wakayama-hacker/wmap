const array = require('stream-array')
const File  = require('vinyl')

module.exports = function () {
  const args = Array.prototype.slice.call(arguments)

  let i = 0

  function create(contents) {
    return new File({
      cwd: '/home/wacker/',
      base: '/home/wacker/test',
      path: '/home/wacker/test/file' + (i++).toString() + '.js',
      contents: new Buffer(contents),
      stat: { mode: '0666' }
    })
  }

  return array(args.map(create))
}
