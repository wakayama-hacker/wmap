'use strict'

require( 'babel-polyfill' )

global.config = require( '../json/config.json' )
global.resizeTimer

global.riot = require( 'riot' )
global.route = require( 'riot-route' )
const Slideout = require( 'slideout' )
global.request = require( 'superagent' )
global.L = require( 'leaflet' )

global.slideout = new Slideout( {
  'panel': document.getElementById( 'panel' ),
  'menu': document.getElementById( 'menu' ),
  'padding': 256,
  'tolerance': 70,
  'side': 'right',
  'touch': false
} )

const menu_item = require( '../tags/menu-item.tag' )
const menu_header = require( '../tags/menu-header.tag' )
const home_contents = require( '../tags/home-contents.tag' )
const main_contents = require( '../tags/main-contents.tag' )
const map = require( '../tags/map.tag' )
const error = require( '../tags/error.tag' )

if ( window.navigator.standalone ) {
  if ( document.body.clientHeight < document.body.clientWidth ) {
    document.querySelector( 'body' ).classList.remove( 'web-app' )
  } else {
    document.querySelector( 'body' ).classList.add( 'web-app' )
  }

  window.addEventListener( 'resize', () => {
    if ( document.body.clientHeight < document.body.clientWidth ) {
      document.querySelector( 'body' ).classList.remove( 'web-app' )
    } else {
      document.querySelector( 'body' ).classList.add( 'web-app' )
    }
  } )
}

riot.mount( menu_header )

document.querySelector( '.toggle' ).addEventListener( 'click', () => {
  slideout.toggle()
} )

request
  .get( config.endpoint + '/menu.json' )
  .query( { v: new Date().getTime() } )
  .set( 'Accept', 'application/json' )
  .end( function( err, res ) {
    riot.mount( menu_item, {
      json: res.body
    } )
  } )

document.querySelector( '.back-to-home' ).addEventListener( 'click', () => {
  slideout.close()
  route( 'home' )
}, false )

if ( ! location.hash ) {
  route( 'home' )
} else {
  route( location.hash.replace( '#', '/' ) )
}

// All main contents are in this block.
const content_block = document.createElement( 'div' )

route( function( page, id ) {
  if ( ! page ) {
    return
  }

  const parent = document.querySelector( '#panel' )
  while ( parent.firstChild ) {
    parent.removeChild( parent.firstChild )
  }
  parent.appendChild( content_block )

  // to ignore scroll when map is showing
  document.body.classList.remove( 'fixed' )
  document.querySelector( '#panel' ).style.height = 'auto'

  riot.mount( content_block, error, {
    message: 'Not Found.'
  } )

  const event = new CustomEvent( 'router-' + page, { 'detail': {
    id: id
  } } )
  document.dispatchEvent( event )

  slideout.close()
  window.scrollTo( 0, 0 )
} )

route.start( true )

const router = function( page, callback ) {
  document.addEventListener( 'router-' + page, ( e ) => {
    const id = e.detail.id
    content_block.innerHTML = ''
    callback( id )
  }, false )
}

const mount = function( tag, opts ) {
  riot.mount( content_block, tag, opts )
}

router( 'home', () => {
  mount( home_contents )
} )

router( 'data', ( id ) => {
  if ( id.match( /^[a-f0-9]{32}$/ ) ) {
    request
      .get( config.endpoint + '/' + id + '.json' )
      .set( 'Accept', 'application/json' )
      .end( function( err, res ) {
        if ( err ) {
          mount( error, {
            message: 'Not Found.'
          } )
        } else {
          mount( main_contents, {
            id: id,
            data: res.body
          } )
        }
      } )
  } else {
    mount( error, {
      message: 'Not Found.'
    } )
  }
} )

router( 'map', ( id ) => {
  if ( id.match( /^[a-f0-9]{32}\:[0-9]+$/ ) ) {
    const args = id.split( ':' )
    request
      .get( config.endpoint + '/' + args[0] + '.json' )
      .set( 'Accept', 'application/json' )
      .end( function( err, res ) {
        if ( err ) {
          mount( error, {
            message: 'Not Found.'
          } )
        } else {
          const data = res.body[ args[1] ]
          mount( map, {
            layers: config.map.layers,
            zoom: config.map.zoom,
            lat: data.lat,
            lng: data.lng,
            markers: res.body
          } )
        }
      } )
  } else {
    mount( error, {
      message: 'Not Found.'
    } )
  }
} )
