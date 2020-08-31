/*****************************************************************************/
"use strict";
/*****************************************************************************/
const cssDef              = require('./cssDef').cssDef ;
const divPerimeter        = require('./divPerimeter').divPerimeter ; 
const selectContentFormat = require('./contentFormat').selectContentFormat;
const Viewport = require('../core/Viewport') .Viewport; 
/*****************************************************************************/

const _configureMargins = function(contentViewport){

    $('#marginLeft').css({
        top: contentViewport.top, 
        width: contentViewport.left, 
        height:contentViewport.height
    })
     $('#marginRight').css({
        top: contentViewport.top, 
        width: contentViewport.left, 
        height:contentViewport.height, 
        left: contentViewport.left + contentViewport.width
    })

}


const _configureLayout = function( app, pageElements ){
    $(".gutter").remove();          //removing all gutters
    let contentViewport = require('./configureOuterLayout.js').configureOuterLayout( app, pageElements  );

    /* now we know how much real estate we have */
    const maxDimensions = new Viewport(contentViewport); 

    let contentFrame = selectContentFormat( maxDimensions, app.ui.contentFormats );  
    let totalMarginWidth = contentViewport.width - contentFrame.dimensions.width; 
    contentViewport.left = totalMarginWidth / 2; 
    contentViewport.width = contentFrame.dimensions.width; 
    contentViewport.height = contentFrame.dimensions.height; 

    _configureMargins(contentViewport);
   /* layoutVisualElements({
            app, 
            contentViewport, 
            viewportTemplate: contentFrame
    }); 
    layoutText( app );*/
}


const uiFrameFeature = function( app, pageElements ){
    app.ui.visualElements = { 
        resize    : _ =>  _configureLayout( app )
    };
    _configureLayout( app, pageElements ); 
    return app; 
}

module.exports = {
   uiFrameFeature
}