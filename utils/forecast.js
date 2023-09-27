const request = require('request')

const forecast = (Latitute, Longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=90ab5348e63a957484e12ff0e52db3b9&query=' + Latitute + "," + Longtitude
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback("Unable connect to GeoCoding services",undefined)
        } else if (body.error){
            callback("No matching",undefined)
        } 
        else {
            console.log(body)
            callback(undefined,"It is currently " + body.current.temperature + "*" + ", Chance to rain is " + body.current.precip 
            + " Wind speed is " + body.current.wind_speed)
        }
})
}

module.exports = forecast