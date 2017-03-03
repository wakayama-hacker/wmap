'use strict'

const assert      = require('stream-assert')
const xlsx2csv    = require('../../lib/wnew_xlsx2csv')
const test        = require('./helpers/test-stream')
const expectVinyl = require('./helpers/expect-vinyl')
const hasExtension = expectVinyl.hasExtension

describe('gulp-xlsx2csv', () => {

  describe('file input', () => {

    describe('single menu', () => {

      const xlsx =
        'menu,title,lat,lng,content\n' +
        '串本,橋杭岩,12.345,123.45,これは橋杭岩です\n' +
        '串本,潮岬,23.456,132.1,これは潮岬です\n'

      it('should return single file', done => {
        test(xlsx)
          .pipe(xlsx2csv())
          .pipe(assert.length(1))
          .pipe(assert.end(done))
      })

      it('should return menu array, firstly', done => {
        test(xlsx)
          .pipe(xlsx2csv())
          .pipe(assert.first(hasExtension('csv')))
          .pipe(assert.end(done))
      })
    })
  })
})
