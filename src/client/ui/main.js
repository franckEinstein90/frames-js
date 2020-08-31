/******************************************************************************
 * 
 ******************************************************************************/
"use strict"
/******************************************************************************/
const getFormatData = require('./contentFormat').getFormatData
/******************************************************************************/

const ui = function( app, pageElements ){
    app.ui = {
        contentFormats : getFormatData(app.containerId)
    }
    app.ui.frame = require('./frame.js').uiFrameFeature( app,pageElements )
}

const resizeUI = function( app ){
    app.ui.visualElements.resize();
}

const addUiFeature = (app, pageElements) => {
    try {
        ui(app, pageElements);
    } catch (err){
        debugger
    }
    $(window).resize(()=>{
        resizeUI( app ); 
    })
    $('#frameNext').click(function(){
        console.log(app)
    })
    return app; 
}

module.exports = {
    addUiFeature
}