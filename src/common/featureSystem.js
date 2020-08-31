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