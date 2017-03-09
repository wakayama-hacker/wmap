describe( 'main-contents specs', function() {

  before( function() {
    var body = document.body

    while ( body.firstChild ) {
      body.removeChild( body.firstChild )
    }

    var html = document.createElement( 'main-contents' )
    body.appendChild( html )
    html.classList.add( 'main-contents' )
  } )

  it( 'Tests for the `<main-contents />` with args', function() {
    riot.mount( 'main-contents', { data: [
      {
        title: 'Orange',
        content: 'This is an orange.'
      },
      {
        title: 'Apple',
        content: 'This is an apple.'
      },
      {
        title: 'Banana',
        content: 'This is a banana.'
      },
    ] } )
    expect( document.querySelectorAll( '.item' ).length ).to.be( 3 )
    expect( document.querySelector( '.item:nth-child(1) .item-title' ).innerText ).to.be( 'Orange' )
    expect( document.querySelector( '.item:nth-child(2) .item-description' ).innerText ).to.be( 'This is an apple.' )
    expect( document.querySelector( '.item:nth-child(2)' ).classList.contains( 'active' ) ).to.be( false )
  } )
} )
