const request = require('request')

const forecast = (latitude, longitude , callback) => {
const url = 'http://api.weatherstack.com/current?access_key=c2a93d5fcbcdf36c2123874488a3dd46&query=' + latitude + ',' + longitude + '&units=f'

request({ url, json :true }, (error, { body}) =>  {
    if(error) {
        callback('unable to connect with the server', undefined)
    }
    else if(body.error) {
        callback('unable to find location' , undefined)
    } 
    else {
        callback(undefined,
         body.current.feelslike +   'degrees out' )
        }
        })
    }

 

module.exports = forecast