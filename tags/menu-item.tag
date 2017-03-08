<menu-item>
  <div each={ items } class="item" data-item={ id } onclick={ parent.click }>
    <div>{ value }</div>
    <div><i class="glyphicon glyphicon-menu-right"></i></div>
  </div>

  <script type="es6">
    this.items = opts.json
    this.click = function( e ) {
      const id = e.target.getAttribute( 'data-item' )
      slideout.close()
      route( 'data/' + id )
    }.bind( this )
  </script>

</menu-item>
