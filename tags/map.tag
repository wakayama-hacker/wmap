<map class="map" style="width: 100%; height: 100%;">
  <div class="back" onclick="{ click }"><i class="glyphicon glyphicon-remove"></i></div>
  <script type="es6">
    const div = document.createElement( 'div' )
    this.root.appendChild( div )
    div.style.width = '100%'
    document.body.classList.add( 'fixed' )

    const h = document.body.clientHeight - document.querySelector( '.fixed-header' ).clientHeight
    div.style.height = h + 'px'

    if ( ! opts.zoom ) {
      opts.zoom = 14
    }

    const map = L.map( div )
    map.setView( new L.LatLng( opts.lat, opts.lng ), opts.zoom )

    const markers = new L.LayerGroup()

    const redIcon = new L.Icon( {
      iconUrl: 'img/marker-icon-2x-red.png',
      shadowUrl: 'img/marker-shadow.png',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 41 ],
      popupAnchor: [ 1, -34 ],
      shadowSize: [ 41, 41 ]
    } )

    opts.markers.forEach( function( data ) {
      const div = document.createElement( 'div' )
      const title = document.createElement( 'h4' )
      const a = document.createElement( 'a' )
      a.href = 'http://maps.apple.com/?q=' + escape( data.lat ) + ',' + escape( data.lng )
      a.innerText = data.title
      title.appendChild( a )
      const content = document.createElement( 'div' )
      content.innerHTML = data.content
      div.appendChild( title )
      div.appendChild( content )

      if ( opts.lat === data.lat && opts.lng === data.lng ) {
        L.marker( [ data.lat, data.lng ], { icon: redIcon } ).addTo( markers )
          .bindPopup( div ).openPopup()
      } else {
        L.marker( [ data.lat, data.lng ] ).addTo( markers )
          .bindPopup( div )
      }
    } )

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

    this.click = function() {
      window.history.back()
    }.bind( this )

    window.addEventListener( 'resize', function() {
      if ( global.resizeTimer !== false ) {
        clearTimeout( global.resizeTimer )
      }
      global.resizeTimer = setTimeout( function() {
        const h = document.body.clientHeight - document.querySelector( '.fixed-header' ).clientHeight
        div.style.height = h + 'px'
        map.invalidateSize()
      }, Math.floor( 1000 / 60 * 10 ) )
    } )

  </script>
</map>
