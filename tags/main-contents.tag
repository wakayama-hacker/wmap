<main-contents>

  <section class="item" each={ data } show={ data }>
    <div class="wrap">
      <header class="item-header">
        <h2 class="item-title">{ title }</h2>
        <div class="item-toggle"><i class="glyphicon glyphicon-menu-down toggle" onclick={ parent.click }></i></div>
      </header>
      <p class="item-description">{ content }</p>
      <div class="item-contents"></div>
    </div>
  </section>

  <home-contents class="home-contents" hide={ data }></home-contents>

  <script type="es6">

    if ( opts.data ) {
      this.data = opts.data
    }

    this.click = function( e ) {
      const item = e.item
      const index = this.data.indexOf( item ) + 1
      const selector = '.main-contents .item:nth-child(' + index + ')'

      if ( document.querySelector( selector ).classList.contains( 'active' ) ) {
        document.querySelector( selector ).classList.remove( 'active' )
      } else {
        const items = document.querySelectorAll( '.main-contents .item.active' )
        for ( var i = 0; i < items.length; i++ ) {
          items[i].classList.remove( 'active' )
        }

        document.querySelector( selector ).classList.add( 'active' )
        riot.mount(
          document.querySelector( selector + ' .item-contents' ),
          'item-contents',
          { data: item }
        )
      }
    }.bind( this )

    window.scrollTo( 0, 0 )
  </script>

</main-contents>
