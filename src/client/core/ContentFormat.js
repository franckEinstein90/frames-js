"use strict";
const Viewport = require("./Viewport").Viewport; 

 

const ContentFormat = function(formatName, formatSpecs){
    this.name = formatName; 
    this.standardWidth = formatSpecs.width; 
    this.standardHeight = formatSpecs.height; 
    this.cols = formatSpecs.cols; 
    this.rows = formatSpecs.rows; 
}

ContentFormat.prototype.fit = function( viewport ){
    let contentWidth = viewport.width; 
    let contentHeight = ( contentWidth * this.standardHeight / this.standardWidth ); 
    while( contentHeight > viewport.height ){ //scale the height 
            contentHeight = contentHeight * 0.95;   
            contentWidth = contentWidth * 0.95; 
     }
    let wasted = viewport.area - (contentWidth * contentHeight); 
    return {
        formatName : this.name, 
        cols : this.cols, 
        rows : this.rows,
        wasted, 
        viewport : new Viewport({
                width: contentWidth, 
                height: contentHeight
        })
     }
}

module.exports = {
    ContentFormat
}

