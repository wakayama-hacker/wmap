<map class="map">
  <div class="back" onclick="{ click }"><i class="glyphicon glyphicon-remove"></i></div>
  <script type="es6">
    const div = document.createElement( 'div' )
    this.root.appendChild( div )
    div.style.width = '100%'
    console.log( document.querySelector( '.fixed-header' ).clientHeight )
    const h = document.querySelector( '#panel' ).clientHeight - document.querySelector( '.fixed-header' ).clientHeight
    div.style.height = h + 'px'

    const lat = opts.lat
    const lng = opts.lng

    const map = L.map( div ).setView( [ lat, lng ], 14 )

    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    } ).addTo( map )

    L.marker( [ lat, lng ] ).addTo( map )

    this.click = function() {
      window.history.back()
    }.bind( this )
</script>
</map>
