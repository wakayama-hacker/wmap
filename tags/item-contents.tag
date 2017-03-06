<item-contents style="border: 1px solid #dedede;">

  <script type="es6">
    while ( this.root.firstChild ) {
      this.root.removeChild( this.root.firstChild )
    }

    const div = document.createElement( 'div' )
    this.root.appendChild( div )
    div.style.width = '100%'
    div.style.height = '300px'

    const lat = opts.data.lat
    const lng = opts.data.lng

    if ( typeof L !== 'undefined' ) {
      const map = L.map( div ).setView( [ lat, lng ], 16 )

      L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      } ).addTo( map )

      L.marker( [ lat, lng ] ).addTo( map )
    }
  </script>
</item-contents>
