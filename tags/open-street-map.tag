<open-street-map class={ classes }>
  <div id={ id }></div>

  <script type="es6">

    const L = require( 'mapbox.js' )

    // generate id
    const id = 'osm-' + this._riot_id

    this.id = id

    // default class
    this.classes = [
      'map',
      'open-street-map'
    ].concat( ( opts.classes || [] ) ).join( ' ' )

    // parse map arguments
    const lat   = opts.lat  || ( opts.default && opts.default.lat )  || 0
    const lng   = opts.lng  || ( opts.default && opts.default.lng )  || 0
    const zoom  = opts.zoom || ( opts.default && opts.default.zoom ) || 10

    this.on( 'mount', function() {
      L.mapbox.accessToken = opts.public_access_token
      const map = L.mapbox.map( id, 'mapbox.streets' ).setView( [ lat, lng ], zoom )
      L.marker( [ lat, lng ] ).addTo( map )
    } )
  </script>

</open-street-map>
