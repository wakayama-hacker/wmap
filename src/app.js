'use strict'

const riot = require( 'riot' )
const Slideout =require( 'slideout' )
const request = require( 'superagent' )
// eslint-disable-next-line no-unused-vars
const L = require( 'leaflet' )

const menu_item = require( '../tags/menu-item.tag' )
const menu_header = require( '../tags/menu-header.tag' )
const menu_footer = require( '../tags/menu-footer.tag' )
const home_contents = require( '../tags/home-contents.tag' )
const acknowledgements = require( '../tags/acknowledgements.tag' )
// eslint-disable-next-line no-unused-vars
const item_contents = require( '../tags/item-contents.tag' )
const main_contents = require( '../tags/main-contents.tag' )

const slideout = new Slideout( {
  'panel': document.getElementById( 'panel' ),
  'menu': document.getElementById( 'menu' ),
  'padding': 256,
  'tolerance': 70,
  'side': 'right',
  'touch': false
} )

if ( window.navigator.standalone ) {
  document.querySelector( 'body' ).classList.add( 'web-app' )
}

request
  .get( 'config.json' )
  .set( 'Accept', 'application/json' )
  .end( function( err, res ) {
    document.title = res.body.main_title

    riot.mount( main_contents )
    riot.mount( home_contents )
    riot.mount( acknowledgements, { title: res.body.main_title + 'を作った人たち' , authors: res.body.authors } )
    riot.mount( menu_header, { title: res.body.menu_title, slideout: slideout } )
    riot.mount( menu_footer, { slideout: slideout } )

    document.querySelector( '.toggle' ).addEventListener( 'click', function() {
      slideout.toggle()
    } )

    request
      .get( 'json/menu.json' )
      .query( { v: new Date().getTime() } )
      .set( 'Accept', 'application/json' )
      .end( function( err, res ) {
        riot.mount( menu_item, {
          request: request,
          slideout: slideout,
          json: res.body
        } )
      } )
  } )

document.querySelector( '.back-to-home' ).addEventListener( 'click', function() {
  slideout.close()
  riot.mount( main_contents, {} )
}, false )
