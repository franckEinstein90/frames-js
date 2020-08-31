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