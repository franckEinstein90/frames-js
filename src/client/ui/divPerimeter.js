/*****************************************************************************/
"use strict"
/*****************************************************************************/
const Viewport = require('../core/Viewport').Viewport; 

const divPerimeter = function(divID){
    let returnObject =    {
        height: $( divID ).height(), 
        width:  $( divID ).width()
    }; 
    return new Viewport(returnObject); 
}

module.exports = {
    divPerimeter
}