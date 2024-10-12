const waste  = require('../../SchemaModels/wasteRequests')

module.exports.deleteWasteRequest = async ( data ) => {

    let responseData = {
        status:Number,
        message:String,
        wasteData:[Object]
      }    
    console.log(data[0],data[1]);
    await waste.deleteOne( { userId:data[0] , _id:data[1]} ).then( ( data )=> {
            console.log(data);
            responseData.message="Successfully deleted your orders",
            responseData.status=200,
            responseData.wasteData = data
        }).catch( (error) => {
            responseData.message=`Error deleting your orders because ${error}`,
            responseData.status=404
    })
    return responseData;       
}
