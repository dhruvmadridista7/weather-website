const request = require('request');


const forecast = (latitude, longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9df07f9916f03a9070b9d350bcbc62e8&query='+ latitude +','+ longitude;// +'&units=f';

    request({url , json : true} , (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find the location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degress out. It feels like '+body.current.feelslike +' degress out')
        }
    })
}


module.exports = forecast;