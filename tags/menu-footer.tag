<menu-footer>
  <div class="item" data-item={ id } onclick={ click }>
    <div>{ title }</div>
    <div><i class="glyphicon glyphicon-menu-right"></i></div>
  </div>

  <script type="es6">
    this.click = function( e ) {
      riot.mount( 'main-contents', {  } )
      opts.slideout.close()
    }.bind( this )
  </script>

</menu-footer>
