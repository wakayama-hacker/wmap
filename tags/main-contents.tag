<main-contents class="main-contents">

  <section class="item" each={ item, index in data }>
    <div class="wrap">
      <header class="item-header">
        <h2 class="item-title">{ item.title }</h2>
        <div class="item-toggle" show={ item.lat && item.lng }><i class="show-map glyphicon glyphicon-map-marker" onclick={ parent.click } data-id="{ index }"></i></div>
      </header>
      <p class="item-description">{ item.content }</p>
    </div>
  </section>

  <script type="es6">
    if ( opts.data ) {
      this.data = opts.data
    }

    this.click = function( e ) {
      route( 'map/' + opts.id.trim() + ':' + e.target.dataset.id.trim() )
    }.bind( this )
  </script>

</main-contents>
