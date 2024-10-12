const collectionarea  = require('../../SchemaModels/collectionAreaRequestSchema')

module.exports.getCollectionAreaRequest = async ( data ) => {

    let responseData = {
        status:Number,
        message:String,
        collectionAreaData:[Object]
    }    
    
    await collectionarea.find( { userId:data } ).then( ( data )=> {
            console.log("janu");
            console.log(data);
            responseData.message="Successfully fetched your requests",
            responseData.status=200,
            responseData.collectionAreaData = data
        }).catch((error) => {
            responseData.message=`Error fetching your requests because ${error}`,
            responseData.status=404
    })
    return responseData;       
}
