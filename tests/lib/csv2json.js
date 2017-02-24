'use strict'

const es       = require('event-stream')
const File     = require('vinyl')
const csv2json = require('../../lib/csv2json')
const expect   = require('expect.js')

describe('gulp-csv2json', () => {

  it('should be a file stream', done => {

    // Create a csv2json plugin stream
    const stream = csv2json()

    // write the file to it
    stream.write(new File({
      contents: es.readArray([
        'the,csv,contents\n',
        '0,1,2\n',
        '3,4,5\n',
      ])
    }))

    // wait for the file to come back out
    stream.once('data', file => {
      // make sure it came out the same way it went in
      expect(file.isStream()).to.be.true
      done()
    })
  })
})
