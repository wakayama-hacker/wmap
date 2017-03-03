'use strict'

const riot = require( 'riot' )
const Slideout =require( 'slideout' )
const request = require( 'superagent' )

const menu_item = require( '../tags/menu-item.tag' )
const menu_header = require( '../tags/menu-header.tag' )
const main_header = require( '../tags/main-header.tag' )
const main_contents = require( '../tags/main-contents.tag' )

const slideout = new Slideout( {
  'panel': document.getElementById( 'panel' ),
  'menu': document.getElementById( 'menu' ),
  'padding': 256,
  'tolerance': 70,
  'side': 'right'
} )

riot.mount( main_contents )

request
  .get( 'json/menu.json' )
  .set( 'Accept', 'application/json' )
  .end( function( err, res ) {
    riot.mount( menu_item, {
      request: request,
      slideout: slideout,
      json: res.body
    } )
  } )

request
  .get( 'config.json' )
  .set( 'Accept', 'application/json' )
  .end( function( err, res ) {
    document.title = res.body.main_title
    riot.mount( menu_header, { title: res.body.menu_title } )
    riot.mount( main_header, { title: res.body.main_title } )
    document.querySelector( '.toggle' ).addEventListener( 'click', function() {
      slideout.toggle()
    } )
  } )
