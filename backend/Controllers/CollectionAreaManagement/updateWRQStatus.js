
const waste  = require('../../SchemaModels/wasteRequests')

module.exports.updateWRQStatus = async ( data ) => {
    console.log('hej');
    let responseData = {
        status:Number,
        message:String
    }
    
    await waste.updateOne(
        {_id:data},
        {status:'Completed'}
    ).then( () =>{
        responseData.message="Successfully updated the Waste RQ Status",
        responseData.status=200
        console.log('Successfully updated the Waste RQ Status');
    }).catch( (error) => {
        responseData.message=`Error updating Waste RQ status because ${error}`,
        responseData.status=404
    })
    return responseData;       
}