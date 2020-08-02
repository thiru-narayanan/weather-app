const request = require('request');

const forecast = (coordinate1, coordinate2,callback)=>{

    const url ='http://api.weatherstack.com/current?access_key=7f64b626720fbaec388fc45b45ef8e7c&query='+ coordinate2 +','+coordinate1;
//console.log(url);
request({url,json:true},(error,{body}={})=>{
    if (error){
        callback('Hey Please check your internet connection',undefined)
    } else if (body.success ===false){
        callback('Please provide  valid  coordinates',undefined)
    }else {
        callback(undefined,{temperature:body.current.temperature,feelslike: body.current.feelslike,forecast:body.current.weather_descriptions[0]});

    }
})

}

module.exports = forecast ;
