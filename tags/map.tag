<map class="map" style="width: 100%; height: 100%;">
  <div class="back" onclick="{ click }"><i class="glyphicon glyphicon-remove"></i></div>
  <script type="es6">
    const div = document.createElement( 'div' )
    this.root.appendChild( div )
    div.style.width = '100%'
    document.body.classList.add( 'fixed' )

    const map = L.map( div )

    const show_map = function() {
      if ( document.querySelector( '.fixed-header' ) ) {
        const h = document.body.clientHeight - document.querySelector( '.fixed-header' ).clientHeight
        div.style.height = h + 'px'
      } else {
        div.style.height = '100%'
      }

      const lat = opts.lat
      const lng = opts.lng

      if ( ! opts.zoom ) {
        opts.zoom = 14
      }

      map.setView( new L.LatLng( lat, lng ), opts.zoom )

      const markers = new L.LayerGroup()

      L.marker( [ lat, lng ] ).on( 'click', function() {
        location.href='http://maps.apple.com/?q='+lat+','+lng
      } ).addTo( markers )

      map.addLayer( markers )

      const layers = opts.layers

      const basemaps = {}
      for ( var i = 0; i < layers.length; i++ ) {
        const layer = L.tileLayer( layers[ i ].tile, {
          id: i,
          attribution: '<a href="' + layers[ i ].attribution_url + '" target="_blank">' + layers[ i ].attribution + '</a>'
        } )
        basemaps[ layers[ i ].name ] = layer
        if ( 0 === i ) {
          map.addLayer( layer )
        }
      }

      L.control.layers( basemaps, { '<i class="glyphicon glyphicon-map-marker"></i>': markers }, { position: 'bottomleft' } ).addTo( map )
    }

    this.click = function() {
      window.history.back()
    }.bind( this )

    window.addEventListener( 'resize', function() {
      if ( global.resizeTimer !== false ) {
        clearTimeout( global.resizeTimer )
      }
      global.resizeTimer = setTimeout( function() {
        show_map()
      }, Math.floor( 1000 / 60 * 10 ) )
    } )

    show_map()
  </script>
</map>
