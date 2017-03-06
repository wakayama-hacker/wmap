<menu-item>
  <div each={ items } class="item" data-item={ id } onclick={ parent.click }>
    <div>{ value }</div>
    <div><i class="glyphicon glyphicon-menu-right"></i></div>
  </div>

  <script type="es6">
    this.items = opts.json
    this.click = function( e ) {
      const id = e.target.getAttribute( 'data-item' )
      if ( id.match( /^[a-f0-9]{32}$/ ) ) {
        opts.request
          .get( 'json/' + id + '.json' )
          .set( 'Accept', 'application/json' )
          .end( function( err, res ) {
            opts.slideout.close()
            riot.mount( 'main-contents', { data: res.body } )
          } )
      }
    }.bind( this )
  </script>

</menu-item>
