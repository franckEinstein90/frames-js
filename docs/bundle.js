(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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


},{"./Viewport":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"./Ratio":2}],4:[function(require,module,exports){
/*****************************************************************
 * 
 ****************************************************************/
"use strict"
 /***************************************************************/
const cssDef = require('./ui/cssDef').cssDef

$(document).ready( function() {
    const app = {
        containerId: 'content'
    }  
    let pageElements = [
        cssDef({
            id: 'topNav',
            outerLayout: true, 
            top: 0,  
            width: s => s.width,
            height:55
        }), 
        cssDef({
            id: 'content', 
            top: {
                user_controlled: false, 
                initial: {
                    after:'topNav'
                }
            },
            left: {
                user_controlled: false, 
                initial: 0
            },
            height: {
                user_controlled: true, 

            },
            width:{
                user_controlled: true, 
                initial:'max'
            }
        })
    ]
    require('../common/featureSystem').featureSystem( app ); 
    require('./ui/main.js').addUiFeature( app, pageElements );
})
},{"../common/featureSystem":11,"./ui/cssDef":7,"./ui/main.js":10}],5:[function(require,module,exports){
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

},{"./divPerimeter.js":8}],6:[function(require,module,exports){
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
  
},{"../core/ContentFormat":1}],7:[function(require,module,exports){
"use strict";

const cssDef = options => screen => {

   let assign = (value, property) => {
       if(typeof value[property] === 'function'){
           return value[property](screen)
       } else {
           return value[property]
       }
   }
   let height = 0
   let width = 0

   if(options.width) width = assign( options, 'width')
   if(options.height) height = assign( options, 'height')

   return {
       id: options.id || null, 
       left: 0, 
       top: 0, 
       width, 
       height, 
       outerLayout : options.outerLayout || false
   }    
}

module.exports = {
    cssDef
}
},{}],8:[function(require,module,exports){
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
},{"../core/Viewport":3}],9:[function(require,module,exports){
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
},{"../core/Viewport":3,"./configureOuterLayout.js":5,"./contentFormat":6,"./cssDef":7,"./divPerimeter":8}],10:[function(require,module,exports){
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
},{"./contentFormat":6,"./frame.js":9}],11:[function(require,module,exports){
"use strict"

const features = (function(){

    let _features       = new Map()
    let _reqMajor       = 0
    let _requirements   = new Map()

    return {

        get featureList()  {
            let list = {} 
            _features.forEach((value, key)=>{
                list[key] = value
            })
            return list
        },

        implements  : function(featureLabel){
            if(!_features.has(featureLabel)) return false
            return(_features.get(featureLabel).state === 'implemented')
        }, 

        addRequirement  : function({
            req, 
            parentReq
        }) {
            if( parentReq === undefined || parentReq === null){
                _reqMajor += 1
                _requirements.set(  _reqMajor, req)
            }
        },

        includes: featureName => {
            if(_features.has(featureName)) return _features.get(featureName)
            return false
        },

        addFeature : function({
            label, 
            description, 
            state
        }){
            if(featureSystem.includes(label)){
                throw "feature already exists"
            }
            if(description === undefined || description === null){
                description = "no description"
            }
            _features.set(label, {state, description})
        }
    }

})();

const featureSystem = function( app ){
    app.features = features;
    app.addFeature = feature => features.addFeature( feature );
    app.implements = featureLabel => features.implements(featureLabel);
}

module.exports = {
   featureSystem 
};
},{}]},{},[4]);
