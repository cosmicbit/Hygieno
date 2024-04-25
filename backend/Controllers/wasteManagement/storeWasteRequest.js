const waste  = require('../../SchemaModels/wasteRequests')

module.exports.storeWasteRequest = async ( data ) => {

    let responseData = {
        status:Number,
        message:String,
        wasteData:[Object]
    }

    const {location} = data;
    console.log(location);
    const { type , coordinates } = JSON.parse(location);
    const imageBuffer = Buffer.from(data.waste_image, 'base64');
    console.log(imageBuffer)
    
    const newWaste = new waste({
        userId: data.userId,
        
        date:data.date,

        status:data.status,

        desc:data.desc,
        
        wasteTypes: data.wasteTypes,
    
        image: imageBuffer,
    
        collector:data.collector,

        collectionArea : data.collectionarea,

        location:{
            type : type,
            coordinates : coordinates
        }
    })
            await newWaste.save().then( (data)=> {
                responseData.message="Waste Request has been stored successfully",
                responseData.status=200,
                responseData.wasteData = data
            }).catch( (error) => {
                responseData.message=`Error storing waste request because ${error}`,
                responseData.status=404
            })
            return responseData;           
}
