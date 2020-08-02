const request = require('request');


const geocode = (address, callback)=>{

    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGhpcnVuOTMiLCJhIjoiY2tkMGZkeDZzMHN6YjJ5bXZmbmRnMmE4OSJ9.A7sTAOTUPO_0dKdh58v3Uw&limit=1';
request({url, json: true},(error, {body}={})=>{
    if (error){
        callback('Hey Please check your internet connection',undefined)
    } else if (body.features.length ===0){
        callback('Please provide a valide location',undefined)
    }else {
        callback(undefined,{latitude:body.features[0].center[0],longitude:body.features[0].center[1], location:body.features[0].place_name});

    }



});

}

module.exports =  geocode;