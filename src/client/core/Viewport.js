"use strict"; 
const Ratio = require('./Ratio').Ratio; 

const Viewport = function( options ){
    this.width = options.width;
    this.height = options.height; 
    this.ratio =  new Ratio( options ); 

    this.area = this.width * this.height; 
    this.diagonal = Math.sqrt((this.width*this.width) + (this.height*this.height));  
    this.orientation = this.height > this.width ? 'portrait' : 'landscape'; 

}


module.exports = {
    Viewport
}