/**
 * このテストは `hello.tag` のテストのサンプルです！
 */
describe( 'menu-header specs', function() {

  before( function() {
    // `<body />` 内の全ての要素を削除。
    // 毎回削除しないと他のテストで追加した要素が残ることに注意！
    var body = document.body

    while ( body.firstChild ) {
      body.removeChild( body.firstChild )
    }

    // `<body><not-found></not-found></body>` を作成
    var html = document.createElement( 'menu-header' )
    body.appendChild( html )
  } )

  it( 'Tests for the `<menu-header />` with args', function() {
    // `<hello>` に対してオプションを指定
    riot.mount( 'menu-header', { title: 'hello' } )

    // 指定したオプションが反映されるかをテスト
    expect( $( 'h1' ).text() ).to.be( 'hello' )
  } )
} )
