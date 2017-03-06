describe( 'menu-item specs', function() {

  before( function() {
    var body = document.body

    while ( body.firstChild ) {
      body.removeChild( body.firstChild )
    }

    var html = document.createElement( 'menu-item' )
    body.appendChild( html )
  } )

  it( 'Tests for the `<menu-item />` with args', function() {
    riot.mount( 'menu-item', { json: [ 'orange', 'apple', 'strawberry' ] } )
    expect( document.querySelectorAll( '.item' ).length ).to.be( 3 )
  } )
} )
