'use strict'

global.config = require( './default.json' )

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

if ( window.navigator.standalone ) {
  document.querySelector( 'body' ).classList.add( 'web-app' )
}

document.title = config.main_title

riot.mount( menu_header )

document.querySelector( '.toggle' ).addEventListener( 'click', function() {
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

document.querySelector( '.back-to-home' ).addEventListener( 'click', function() {
  slideout.close()
  route( 'home' )
}, false )

if ( ! location.hash ) {
  route( 'home' )
} else {
  route( location.hash.replace( '#', '/' ) )
}

route( function( page, id ) {
  if ( ! page ) {
    return
  }

  const parent = document.querySelector( '#panel' )
  while ( parent.firstChild ) {
    parent.removeChild( parent.firstChild )
  }
  const div = document.createElement( 'div' )
  parent.append( div )

  const event = new CustomEvent( 'router-' + page, { 'detail': {
    div: div,
    id: id
  } } )
  document.dispatchEvent( event )
} )

route.start( true )

const router = function( page, callback ) {
  document.addEventListener( 'router-' + page, function( e ) {
    const div = e.detail.div
    const id = e.detail.id
    callback( div, id )
  }, false )
}

router( 'home', function( div ) {
  riot.mount( div, home_contents )
} )

router( 'data', function( div, id ) {
  if ( id.match( /^[a-f0-9]{32}$/ ) ) {
    request
      .get( config.endpoint + '/' + id + '.json' )
      .set( 'Accept', 'application/json' )
      .end( function( err, res ) {
        riot.mount( div, main_contents, { data: res.body } )
      } )
  }
} )

router( 'map', function( div, id ) {
  const latlng = id.split( ',' )
  const lat = latlng[0]
  const lng = latlng[1]
  riot.mount( div, map, {
    lat: lat,
    lng: lng
  } )
} )
