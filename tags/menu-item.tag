<menu-item>
  <div each={ items } class="item" data-item={ id } onclick={ click }>
    <div>{ value }</div>
    <div><i class="glyphicon glyphicon-menu-right"></i></div>
  </div>

  <script type="es6">
    this.items = opts.json
    this.click = function( e ) {
      const id = e.currentTarget.getAttribute( 'data-item' )
      slideout.close()
      route( 'data/' + id )
    }
  </script>

</menu-item>
