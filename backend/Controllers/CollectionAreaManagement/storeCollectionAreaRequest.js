const collectionarea  = require('../../SchemaModels/collectionAreaRequestSchema')
const ReverseGeocode = require('../Geocoding/reversegeocoding');
const { spawn } = require('child_process');

module.exports.storeCollectionAreaRequest = async ( data ) => {

    let responseData = {
        status:Number,
        message:String
    }
    console.log("hello");
    console.log(data);
    const { location } = data;
    console.log("hello");
    console.log(location);
    const { type , coordinates } = JSON.parse(location.trim());
    console.log("coordinjates");
    console.log(coordinates);
    const [lat, lng]=coordinates[0];
    console.log(lat);
    const area = await ReverseGeocode(coordinates)
    .then((formattedAddress) => {
        console.log('Formatted Addgreress:', formattedAddress);
        return formattedAddress;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    console.log('Area: ',area);
    const newcollectionarea = new collectionarea({
        userId:     data.userId,

        email:      data.email,
        
        date:       data.date,

        wasteTypes: data.wasteTypes,
    
        location:{
            type : type,
            coordinates : [lng,lat]
        },
        area: area

    })
    console.log(newcollectionarea);
    await newcollectionarea.save().then( ()=> {
        responseData.message="Collection Area Request has been stored successfully",
        responseData.status=200
    }).catch( (error) => {
        responseData.message=`Error storing collection area request because ${error}`,
        responseData.status=404
    })
    return responseData;           
}
