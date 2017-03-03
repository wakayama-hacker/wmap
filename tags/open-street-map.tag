<open-street-map class="open-street-map">

  <div
    id={ id }
    class={ classes }
    data-lat={ lat }
    data-lng={ lng }
    data-address={ address }
  ></div>

  <script type="es6">

    this.id      = opts.id
    this.classes = [
      'map-canvas',
      'osm-map-canvas'
    ].concat( ( opts.classes || [] ) ).join( ' ' )
    this.lat     = opts.lat
    this.lng     = opts.lng
    this.address = opts.address

  </script>

</open-street-map>
