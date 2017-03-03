<menu-header class="header" onclick={ click }>
  <h1 class="title">{ title }</h1>
  <div><i class="glyphicon glyphicon-menu-right"></i></div>

  <script type="es6">
    this.title = opts.title
    this.click = function( e ) {
      riot.mount( 'main-contents', {} )
      opts.slideout.close()
    }.bind( this )
  </script>

</menu-header>
