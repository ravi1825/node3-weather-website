
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoicmF2aW1laHRhMTgyNSIsImEiOiJja2ppcWU3NWUzcWQyMnFydXc3c2cwOHV3In0.w-orcaRzSR8dSoO4ErTKPA'
   
    request({ url, json : true }, (error ,{ body }) => {
         if(error) {
            callback('unable to connect with the server', undefined)
         }
         else if (body.features.length === 0) { 
          callback('unable to find location', undefined)
        }  
            
         else {
             callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
           }) 
       }
       })  
   }

   module.exports = geocode