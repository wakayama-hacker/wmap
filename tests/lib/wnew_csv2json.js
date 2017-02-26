'use strict'

const assert   = require('stream-assert')
const expect   = require('expect.js')
const csv2json = require('../../lib/wnew_csv2json')
const test     = require('./helper/test-stream')

/**
 * An assertion Helper to check if a vinyl object has a certain filename
 * @param  {Vinyl}   file [description]
 * @param  {String}  name [description]
 * @return {Expect}       [description]
 */
const hasName = name => file => expect(file.path).to.equal(`${file.base}/${name}`)

/**
* An assertion Helper to check if a vinyl object has a certain json string
 * @param  {Vinyl}   file [description]
 * @param  {Object}  json [description]
 * @return {Expect}       [description]
 */
const isJSON = json => file => expect(file.contents.toString()).to.equal(JSON.stringify(json))


describe('gulp-csv2json', () => {

  describe('single CSV file input', () => {

    describe('single menu', () => {

      const CSV =
        'menu,title,lat,lng,content\n' +
        '串本,橋杭岩,12.345,123.45,これは橋杭岩です\n' +
        '串本,潮岬,23.456,132.1,これは潮岬です\n'

      it('should return 2 files', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(2))
          .pipe(assert.end(done))
      })

      it('should return menu array, firstly', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.first(isJSON(['串本'])))
          .pipe(assert.end(done))
      })

      it('should be named propery', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.first(hasName('menu.json')))
          .pipe(assert.end(done))
      })

      it('should return converted json from csv, secondly', done => {
        const json = [
          {
            'title': '橋杭岩',
            'lat': '12.345',
            'lng': '123.45',
            'content': 'これは橋杭岩です'
          },
          {
            'title': '潮岬',
            'lat': '23.456',
            'lng': '132.1',
            'content': 'これは潮岬です'
          }
        ]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.second(isJSON(json)))
          .pipe(assert.end(done))
      })

      it('should be named propery', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.second(hasName('串本.json')))
          .pipe(assert.end(done))
      })
    })

    describe('multiple menus', () => {

      const CSV =
        'menu,title,lat,lng,content\n' +
        '串本,橋杭岩,12.345,123.45,これは橋杭岩です\n' +
        '串本,潮岬,23.456,132.1,これは潮岬です\n' +
        '白浜,円月島,76.54,32.1,これは円月島です'


      it('should return 3 files', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(3))
          .pipe(assert.end(done))
      })

      it('should return menu array, firstly', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.first(isJSON(['串本','白浜'])))
          .pipe(assert.end(done))
      })

      it('should return converted json from csv, secondly', done => {
        const json = [
          {
            'title': '橋杭岩',
            'lat': '12.345',
            'lng': '123.45',
            'content': 'これは橋杭岩です'
          },
          {
            'title': '潮岬',
            'lat': '23.456',
            'lng': '132.1',
            'content': 'これは潮岬です'
          }
        ]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.second(isJSON(json)))
          .pipe(assert.end(done))
      })


      it('should be named propery', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.second(hasName('串本.json')))
          .pipe(assert.end(done))
      })

      it('should return converted json from csv, thirdly in this case', done => {
        const json = [
          {
            'title': '円月島',
            'lat': '76.54',
            'lng': '32.1',
            'content': 'これは円月島です'
          }
        ]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.nth(2, isJSON(json)))
          .pipe(assert.end(done))
      })

      it('should be named propery', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.nth(2, hasName('白浜.json')))
          .pipe(assert.end(done))
      })
    })

    describe('invalid csv or exceptional cases', () => {

      it('should return only empty menu file with empty csv', done => {

        const CSV = ''
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(1))
          .pipe(assert.first(isJSON([])))
          .pipe(assert.end(done))
      })

      it('should return only empty menu file without menu column', done => {

        const CSV = 'a,b,c\n1,2,3'
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(1))
          .pipe(assert.first(isJSON([])))
          .pipe(assert.end(done))
      })

      it('should be skipped without menu value', done => {

        const CSV = 'menu,a,b\n,2,3\nvalue1,5,6' // evaluated as empty string
        const expected = [{ a: '5', b: '6' }]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(2))
          .pipe(assert.first(isJSON(['value1'])))
          .pipe(assert.second(hasName('value1.json')))
          .pipe(assert.second(isJSON(expected)))
          .pipe(assert.end(done))
      })

      it('should ignore row with menu fileld with menu value', done => {

        const CSV = 'menu,a,b\nmenu,2,3\nvalue1,5,6' // evaluated as empty string
        const expected = [{ a: '5', b: '6' }]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(2))
          .pipe(assert.first(isJSON(['value1'])))
          .pipe(assert.second(hasName('value1.json')))
          .pipe(assert.second(isJSON(expected)))
          .pipe(assert.end(done))
      })

      it('should skip value shortage', done => {

        const CSV =
          'menu,a,b\n' +
          'value1,2\n' +
          'value2,5,6'
        const expected2nd = [{ a: '2' }]
        const expected3rd = [{ a: '5', b: '6' }]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(3))
          .pipe(assert.second(isJSON(expected2nd)))
          .pipe(assert.nth(2, isJSON(expected3rd)))
          .pipe(assert.end(done))
      })

      it('should skip exceptional column', done => {

        const CSV =
          'menu,a,b\n' +
          'value1,2,3,4\n' +
          'value2,5,6'
        const expected2nd = [{ a: '2', b: '3' }] // should not contain '4' value
        const expected3rd = [{ a: '5', b: '6' }]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(3))
          .pipe(assert.second(isJSON(expected2nd)))
          .pipe(assert.nth(2, isJSON(expected3rd)))
          .pipe(assert.end(done))
      })

      it('should be able to stringify values to be negatively evaluated', done => {

        const CSV =
          'menu,a,b\n' +
          'value1,0,3\n' +
          'value2,5,false'
        const expected2nd = [{ a: '0', b: '3' }] // should not contain '4' value
        const expected3rd = [{ a: '5', b: 'false' }]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(3))
          .pipe(assert.second(isJSON(expected2nd)))
          .pipe(assert.nth(2, isJSON(expected3rd)))
          .pipe(assert.end(done))
      })

      it('should parse if menu column is in backward', done => {

        const CSV =
          'a,b,menu\n' +
          '1,2,value1\n' +
          '3,4,value2'
        const expected2nd = [{ a: '1', b: '2' }]
        const expected3rd = [{ a: '3', b: '4' }]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(3))
          .pipe(assert.second(isJSON(expected2nd)))
          .pipe(assert.nth(2, isJSON(expected3rd)))
          .pipe(assert.end(done))
      })

      it('should skip even if menu menu is behind', done => {

        const CSV =
          'a,b,menu\n' +
          '1,2\n' +
          '3,4,value2'
        const expected2nd = [{ a: '3', b: '4' }]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(2))
          .pipe(assert.second(isJSON(expected2nd)))
          .pipe(assert.end(done))
      })

    })
  })

  describe('several CSV files input', () => {

    describe('not splitted', () => {

      const CSV1 =
        'menu,title,lat,lng,content\n' +
        '串本,橋杭岩,12.345,123.45,これは橋杭岩です\n' +
        '串本,潮岬,23.456,132.1,これは潮岬です'
      const CSV2 =
        'menu,title,lat,lng,content\n' +
        '白浜,円月島,76.54,32.1,これは円月島です'

      it('should return 3 files', done => {
        test(CSV1, CSV2)
          .pipe(csv2json())
          .pipe(assert.length(3))
          .pipe(assert.end(done))
      })

      it('should return menu array, firstly', done => {
        test(CSV1, CSV2)
          .pipe(csv2json())
          .pipe(assert.first(isJSON(['串本','白浜'])))
          .pipe(assert.end(done))
      })

      it('should return converted json from csv, secondly', done => {
        const json = [
          {
            'title': '橋杭岩',
            'lat': '12.345',
            'lng': '123.45',
            'content': 'これは橋杭岩です'
          },
          {
            'title': '潮岬',
            'lat': '23.456',
            'lng': '132.1',
            'content': 'これは潮岬です'
          }
        ]
        test(CSV1, CSV2)
          .pipe(csv2json())
          .pipe(assert.second(isJSON(json)))
          .pipe(assert.end(done))
      })

      it('should be named propery', done => {
        test(CSV1, CSV2)
          .pipe(csv2json())
          .pipe(assert.second(hasName('串本.json')))
          .pipe(assert.end(done))
      })

      it('should return converted json from csv, thirdly in this case', done => {
        const json = [
          {
            'title': '円月島',
            'lat': '76.54',
            'lng': '32.1',
            'content': 'これは円月島です'
          }
        ]
        test(CSV1, CSV2)
          .pipe(csv2json())
          .pipe(assert.nth(2, isJSON(json)))
          .pipe(assert.end(done))
      })

      it('should be named propery', done => {
        test(CSV1, CSV2)
          .pipe(csv2json())
          .pipe(assert.nth(2, hasName('白浜.json')))
          .pipe(assert.end(done))
      })
    })

    describe('splitted resource', () => {

      const CSV1 =
        'menu,title,lat,lng,content\n' +
        '串本,橋杭岩,12.345,123.45,これは橋杭岩です\n' +
        '串本,潮岬,23.456,132.1,これは潮岬です\n' +
        '公衆トイレ,abc,1,2,def'

      const CSV2 =
        'menu,title,lat,lng,content\n' +
        '白浜,円月島,76.54,32.1,これは円月島です\n' +
        '公衆トイレ,xyz,3,4,wu'

      it('should return 4 files', done => {
        test(CSV1, CSV2)
          .pipe(csv2json())
          .pipe(assert.length(4))
          .pipe(assert.end(done))
      })
    })
  })
})
