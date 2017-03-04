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
    const lat   = opts.lat    || 0
    const lng   = opts.lng    || 0
    const zoom  = opts.zoom   || 10
    const PUBLIC_ACCESS_TOKEN = 'pk.eyJ1Ijoia2FtYXRhcnlvIiwiYSI6ImNpenVmNnJ2MTAwMDQycXBwZmloeng0ZTQifQ.5oBaHAa2R9HZl_FJjPGHSQ'

    this.on( 'mount', function() {
      L.mapbox.accessToken = PUBLIC_ACCESS_TOKEN
      const map = L.mapbox.map( id, 'mapbox.streets' ).setView( [ lat, lng ], zoom )
      L.marker( [ lat, lng ] ).addTo( map )
    } )
  </script>

</open-street-map>
