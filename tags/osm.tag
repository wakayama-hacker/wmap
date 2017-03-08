<osm style="width: 100%; height: 300px;">
  <script type="es6">
    while ( this.root.firstChild ) {
      this.root.removeChild( this.root.firstChild )
    }

    const div = document.createElement( 'div' )
    this.root.appendChild( div )
    div.style.width = '100%'
    div.style.height = '100%'

    const lat = opts.lat
    const lng = opts.lng

    if ( typeof L !== 'undefined' ) {
      const map = L.map( div ).setView( [ lat, lng ], 14 )

      L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      } ).addTo( map )

      L.marker( [ lat, lng ] ).addTo( map )
    }
</script>
</osm>
