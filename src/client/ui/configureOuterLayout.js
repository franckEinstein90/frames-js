"use strict"; 

const divPerimeter = require('./divPerimeter.js').divPerimeter
const configureOuterLayout = function( app, visualElements ){
    let screen = divPerimeter( window ); 
    let contentViewport = {
        top: 0,
        left: 0,  
        height: screen.height, 
        width: screen.width, 
        bottom: screen.height
    };
    let specs = visualElements.map(elt => elt(screen)).filter( elt => elt.outerLayout )
    specs.forEach(s => {
        let cssDesc = {
            top: s.top, 
            left: s.left, 
            height: s.height
        }
        $(`#${s.id}`).css(cssDesc);
        contentViewport.top += cssDesc.height; 
        contentViewport.height -= cssDesc.height; 
    })
    return contentViewport; 
}

module.exports = {
    configureOuterLayout
}
