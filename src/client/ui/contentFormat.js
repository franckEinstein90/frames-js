/*****************************************************************
 * 
 * 
 * ***************************************************************/
"use strict";
const ContentFormat = require('../core/ContentFormat').ContentFormat; 

const getFormatData = function( htmlID ){
    const formatData  = $(`#${htmlID}`).data('formats'); 
    const resultArray = []; 
    for (const format in formatData){
        resultArray.push( new ContentFormat(format, formatData[format] ))
    }
    return resultArray; 
}

const selectContentFormat = function( viewport, contentFormats ){
    const formatFits = contentFormats
        .map( format =>format.fit( viewport ) )
        .sort( (a,b)=>a.wasted-b.wasted )
        
    return formatFits[0]
}  


module.exports = {
    getFormatData, 
    selectContentFormat
}
  