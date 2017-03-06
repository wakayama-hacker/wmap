<main-contents>

  <section class="item" each={ data } show={ data }>
    <div class="wrap">
      <header class="item-header">
        <h2 class="item-title">{ title }</h2>
        <div if={ !notoggle } class="item-toggle"><i class="glyphicon glyphicon-menu-down toggle" onclick={ parent.click }></i></div>
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
    // some contents donot need toggle section
    this.notoggle = opts.notoggle

    this.click = function( e ) {
      const item = e.item
      const index = this.data.indexOf( item ) + 1
      const selector = '.main-contents .item:nth-child(' + index + ')'

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
    }.bind( this )
  </script>

</main-contents>
