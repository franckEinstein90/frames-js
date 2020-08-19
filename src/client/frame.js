/*****************************************************************************/
"use strict";
/*****************************************************************************/

const _getAvailablePageFormats = function( options ){
    let _dataContainer = options.dataContainer || '#page';
    let _contentFormats = $(_dataContainer).data('formats');

    return {
        available : _contentFormats 

    }
}

const _configureOuterLayout = function( app ){
    let screen = divPerimeter( window ); 
    //figure out which type of viewPort fits this best 
    //let layoutType = figureOutLayout()
    //render surrounding ui 
    
    let contentViewport = {
        top: 0,
        left: 0,  
        height: screen.height, 
        width: screen.width, 
        bottom: screen.height
    };

    if(app.ui.visualElements.topNav){
        let topNav = app.ui.visualElements.topNav( screen ); 
        contentViewport.top += topNav.height; 
        contentViewport.height -= topNav.height; 
        $('#topNav').css(topNav);
    }

    return contentViewport; 
}

const _configureLayout = function( app ){
    //removing all gutters
    $(".gutter").remove();          
    let contentViewport = _configureOuterLayout( app  );
}


const addFrameSystem = function( app ){
    app.frames = {}; 
    app.frames.formats = _getAvailablePageFormats({})
}

module.exports = {
   addFrameSystem
}