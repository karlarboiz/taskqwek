const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

$(document).ready(function(){
    console.log("I'm ready");
});