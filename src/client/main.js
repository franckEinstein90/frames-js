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