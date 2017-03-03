describe( 'open-street-map specs', function() {

  before( function() {
    // `<body />` 内の全ての要素を削除。
    // 毎回削除しないと他のテストで追加した要素が残ることに注意！
    var body = document.body

    while ( body.firstChild ) {
      body.removeChild( body.firstChild )
    }

    // `<body><open-street-map></open-street-map></body>` を作成
    var html = document.createElement( 'open-street-map' )
    body.appendChild( html )
  } )

  describe( 'on container', function() {

    it( 'should have class `open-street-map`', function() {
      riot.mount( 'open-street-map', {} )
      expect( $( 'open-street-map' ).hasClass( 'open-street-map' ) ).to.be.ok()
    } )
  } )


  describe( 'on map canvas', function() {

    it( 'should have element with id', function() {
      riot.mount( 'open-street-map', { id: 'the-id' } )
      expect( $( 'open-street-map>div' ).attr( 'id' ) ).to.be( 'the-id' )
    } )

    it( 'should render default class', function() {
      riot.mount( 'open-street-map', {} )
      expect( $( 'open-street-map>div' ).attr( 'class' ) ).to.contain( 'map-canvas' )
      expect( $( 'open-street-map>div' ).attr( 'class' ) ).to.contain( 'osm-map-canvas' )
    } )

    it( 'should render array classes in args', function() {
      riot.mount( 'open-street-map', { classes: [ 'a', 'b' ] } )
      expect( $( 'open-street-map>div' ).attr( 'class' ) ).to.contain( 'a' )
      expect( $( 'open-street-map>div' ).attr( 'class' ) ).to.contain( 'b' )
    } )


    it( 'should keep lat value', function() {
      riot.mount( 'open-street-map', { lat: 34.56 } )
      expect( $( 'open-street-map>div' ).attr( 'data-lat' ) ).to.be( '34.56' )
    } )

    it( 'should keep lng value', function() {
      riot.mount( 'open-street-map', { lng: 134.56 } )
      expect( $( 'open-street-map>div' ).attr( 'data-lng' ) ).to.be( '134.56' )
    } )

    it( 'should keep address value', function() {
      riot.mount( 'open-street-map', { address: '和歌山県白浜町x-y-z' } )
      expect( $( 'open-street-map>div' ).attr( 'data-address' ) ).to.be( '和歌山県白浜町x-y-z' )
    } )
  } )
} )
