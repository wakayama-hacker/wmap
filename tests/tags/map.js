describe( 'map specs', function() {

  before( function() {
    const body = document.body

    while ( body.firstChild ) {
      body.removeChild( body.firstChild )
    }

    const fixed_header = document.createElement( 'div' )
    fixed_header.classList.add( 'fixed-header' )

    const html = document.createElement( 'map' )
    document.body.style.width = '100%'
    document.body.style.height = '300px'

    body.appendChild( fixed_header )
    body.appendChild( html )
  } )

  it( 'Tests for the `<map />` with args', function() {
    riot.mount( 'map', {
      layers: config.map.layers,
      lat: '33.488547',
      lng: '135.795751',
      markers: [
        {
          lat: '33.488547',
          lng: '135.795751'
        }
      ]
    } )
    expect( document.querySelectorAll( '.leaflet-container' ).length ).to.be( 1 )
  } )
} )
