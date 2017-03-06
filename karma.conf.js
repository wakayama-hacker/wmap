module.exports = function( config ) {
  config.set( {
    basePath: '',
    frameworks: [ 'mocha', 'riot' ],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-riot'
    ],
    files: [
      'node_modules/expect.js/index.js',
      'tags/*.tag',
      'tests/**/*.js',
    ],
    exclude: [
      'tests/lib/**/*.js'
    ],
    preprocessors: {
      'tags/*.tag': [ 'riot' ]
    },
    browsers: [ 'PhantomJS' ],
    reporters: [ 'mocha' ],
    singleRun: true,
    logLevel: config.LOG_DEBUG,
    client: {
      captureConsole: true
    },
  } )
}
