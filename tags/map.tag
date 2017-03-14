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

      map.setView( new L.LatLng( lat, lng ), 14 )

      L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      } ).addTo( map )

      L.marker( [ lat, lng ] ).addTo( map ).on( 'click', function() {
        location.href='http://maps.apple.com/?q='+lat+','+lng
      } )
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
