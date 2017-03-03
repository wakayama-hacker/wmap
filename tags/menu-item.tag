<menu-item class="menu-item">
  <div each={ items } class="item" data-item={ id } onclick={ click }>
    <div>{ value }</div>
    <div><i class="glyphicon glyphicon-menu-right"></i></div>
  </div>

  <script type="es6">
    this.items = opts.json
    this.click = function( e ) {
      const id = e.target.getAttribute( 'data-item' )
      if ( id.match( /^[0-9]+$/ )) {
        opts.request
          .get( 'json/' + id + '.json' )
          .set( 'Accept', 'application/json' )
          .end(function( err, res ) {
            riot.mount( 'main-contents', { data: res.body } )
            opts.slideout.close()
          })
      }
    }.bind( this )
  </script>

</menu-item>
