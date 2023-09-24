const request = require('request')

const GeoCode = (address, callback) => {
    const url = 'https://us1.locationiq.com/v1/search?key=pk.7e5c0c8f865c67f2a4198a1d4d99d4e0&q='+ address +'&format=json'
    request({url, json: true},(error,{body}) => {
        if(error){
            callback('Unable to connect to location services',undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
            callback(undefined,{
                Latitute: body[0].lat,
                Longtitude: body[0].lon,
                Location: body[0].display_name
            })
        }
    } )
}

module.exports = GeoCode