'use strict'

const riot = require( 'riot' )
const Slideout =require( 'slideout' )
const request = require( 'superagent' )

const menu_item = require( '../tags/menu-item.tag' )
const menu_header = require( '../tags/menu-header.tag' )
const menu_footer = require( ',,.tags/menu-footer.tag' )
const main_header = require( '../tags/main-header.tag' )
const main_contents = require( '../tags/main-contents.tag' )
const home_contents = require( '../tags/home-contents.tag' )

const slideout = new Slideout( {
  'panel': document.getElementById( 'panel' ),
  'menu': document.getElementById( 'menu' ),
  'padding': 256,
  'tolerance': 70,
  'side': 'right'
} )

if ( window.navigator.standalone ) {
  document.querySelector( 'body' ).classList.add( 'web-app' )
}

request
  .get( 'config.json' )
  .set( 'Accept', 'application/json' )
  .end( function( err, res ) {
    document.title = res.body.main_title

    // process contributors value
    const contributors = res.body.contributors.map( contributor => ( {
      title   : contributor.name,
      content : contributor.whoami,
      nomap   : true
    } ) )

    riot.mount( menu_header, { title: res.body.menu_title, slideout: slideout } )
    riot.mount( menu_footer, { title: res.body.menu_title + 'について', data: contributors, slideout: slideout } )
    riot.mount( main_header, { title: res.body.main_title } )

    document.querySelector( '.toggle' ).addEventListener( 'click', function() {
      slideout.toggle()
    } )

    riot.mount( main_contents )
    riot.mount( home_contents )

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
  } )

document.querySelector( '.home-icon' ).addEventListener( 'click', function() {
  slideout.close()
  riot.mount( main_contents, {} )
} )
