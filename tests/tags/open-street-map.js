describe( 'open-street-map specs', function() {

  var require_prev
  // spy
  var spy = {}

  before( function() {
    // `<body />` 内の全ての要素を削除。
    // 毎回削除しないと他のテストで追加した要素が残ることに注意！
    var body = document.body

    while ( body.firstChild ) {
      body.removeChild( body.firstChild )
    }

    // keep old require variable being overiding
    require_prev = window.require
    // create spied `require`
    window.require = function( name ) {
      if ( name === 'mapbox.js' ) {
        const mock = {
          mapbox : {
            map : function( id, type ) {
              spy.id = id
              spy.type = type
              return {
                setView : function() {
                  spy[ 'mapPosition' ] = Array.prototype.slice.call( arguments )
                }
              }
            }
          },
          marker : function() {
            spy['markerPosition'] = Array.prototype.slice.call( arguments )
            return { addTo : function() {} }
          }
        }
        spy.getAccessToken = function() { return mock.mapbox.accessToken }
        return mock
      }
    }

    // `<body><open-street-map></open-street-map></body>` を作成
    var html = document.createElement( 'open-street-map' )
    body.appendChild( html )
  } )


  it( 'should have class `open-street-map`', function() {
    riot.mount( 'open-street-map', {} )
    expect( $( '.open-street-map' ).length ).to.be( 1 )
  } )

  it( 'should set mapview', function() {
    riot.mount( 'open-street-map', {
      lat  : 12,
      lng  : 123,
      zoom : 12
    } )
    expect( spy.mapPosition ).to.eql( [ [ 12, 123 ], 12 ] )
  } )

  it( 'should set map type', function() {
    riot.mount( 'open-street-map', { default: { type: 'some.type' } } )
    expect( spy.type ).to.be( 'some.type' )
  } )

  it( 'should set default mapview', function() {
    riot.mount( 'open-street-map', {
      default: {
        lat  : 23,
        lng  : 134,
        zoom : 14,
        type : 'some.default.type'
      }
    } )
    expect( spy.mapPosition ).to.eql( [ [ 23, 134 ], 14 ] )
    expect( spy.type ).to.be( 'some.default.type' )
  } )

  it( 'should set public access token', function() {
    riot.mount( 'open-street-map', { public_access_token: 'abc' } )
    expect( spy.getAccessToken() ).to.eql( 'abc' )
  } )

  it( 'should set marker', function() {
    riot.mount( 'open-street-map', {
      lat  : 23.45,
      lng  : 98.76,
    } )
    expect( spy.markerPosition ).to.eql( [ [ 23.45, 98.76 ] ] )
  } )

  after( function() {
    // rollback overriode global require
    window.require = require_prev
  } )

} )
