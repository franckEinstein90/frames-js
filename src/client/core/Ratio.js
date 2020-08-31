"use strict"; 


const Ratio = function( options ){
    let width   = options.width; 
    let height  = options.height; 
    let i = 2;
    while( i < width && i < height ){
        if(width%i===0 && height%i===0) {
            width /= i; height/= i;
        } else {
            i++; 
        }
    }
    this.w = width
    this.h = height
    this.whRatio = width/height; 
    this.hwRatio = height/width; 
}

Ratio.prototype.toString = function(){
    return `${this.w} x ${this.h}`; 
}

module.exports = {
    Ratio
}