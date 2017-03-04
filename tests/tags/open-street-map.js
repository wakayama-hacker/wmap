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

    // create spy function
    require_prev = window.require
    window.require = function( name ) {
      if ( name === 'mapbox.js' ) {
        return {
          mapbox : {
            map : function() { return {
              setView : function() {
                spy['mapPosition'] = Array.prototype.slice.call( arguments )
              }
            } }
          },
          marker : function() {
            spy['markerPosition'] = Array.prototype.slice.call( arguments )
            return { addTo : function() {} }
          }
        }
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
