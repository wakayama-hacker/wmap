module.exports = function( config ) {
  config.set( {
    basePath: '',
    frameworks: [ 'mocha', 'riot', 'browserify' ],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-riot',
      'karma-browserify'
    ],
    files: [
      'node_modules/expect.js/index.js',
      'tests/karma-bootstrap.js',
      'tags/*.tag',
      'tests/**/*.js',
    ],
    exclude: [
      'tests/lib/**/*.js'
    ],
    preprocessors: {
      'tests/karma-bootstrap.js': [ 'browserify' ],
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
