const csv2json = require('../../lib/csv2json')
const assert   = require('stream-assert')
const expect   = require('expect.js')
const test     = require('./test-stream')

describe('gulp-csv2json', () => {

  it('should csv2json one file', done => {

    const CSV  = 'aaa,bbb,ccc\n0,1,2'
    const result = [{ 'aaa':0 },{ 'bbb':1 },{ 'ccc':2 }]

    test(CSV)
      .pipe(csv2json())
      .pipe(assert.length(1))
      .pipe(assert.first(d => {
        expect(d.contents.toString()).to.equal(JSON.stringify(result))
      }))
      .pipe(assert.end(done))
  })
})
