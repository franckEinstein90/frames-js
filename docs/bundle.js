(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*****************************************************************************/
"use strict";
/*****************************************************************************/

const _getAvailablePageFormats = function( options ){

    debugger
    let _dataContainer = options.dataContainer || '#page';
    let _contentFormats = $(_dataContainer).data('formats');

    return {
        available : _contentFormats 

    }
}


const _configureLayout = function( app ){
}

const addFrameSystem = function( app ){
    app.frames = {}; 
    app.frames.formats = _getAvailablePageFormats({})
}

module.exports = {
   addFrameSystem
}
},{}],2:[function(require,module,exports){
/*****************************************************************
 * 
 ****************************************************************/
"use strict"
 /***************************************************************/

const addFrameSystem = require('./frame').addFrameSystem; 

$(document).ready(function() {

    let app = {

    }
    app.frame = addFrameSystem(app);

})
},{"./frame":1}]},{},[2]);
