const { isValidObjectId } = require('mongoose');
const waste  = require('../../SchemaModels/wasteRequests')

module.exports.getNewWRQDetails = async ( data ) => {
    console.log('hej');
    let responseData = {
        status:Number,
        message:String,
        newRqFromD:{
            newRequests_ids: new Array(),
            newRequests_dates: new Array(),
            newRequests_disposernames:new Array(),
            newRequests_images:new Array(),
            nofNewRqFromD:Number
        }
    }
        
    
    let k=0;
    console
    for(let x of data){
        console.log('x=',x);
        await waste
        .find(
        {_id:x, status:'Pending Collection'})
        .then( (data)=> {
            console.log('got from database',data[0]);
            responseData.message="Waste req fetched successfully",
            responseData.status=200

            try{
                responseData.newRqFromD.newRequests_ids.push(data[0]._id);
                responseData.newRqFromD.newRequests_disposernames.push(data[0].disposername);
                responseData.newRqFromD.newRequests_dates.push(data[0].date);
                responseData.newRqFromD.newRequests_images.push(data[0].image);   
                responseData.newRqFromD.nofNewRqFromD=++k;
                        
            }catch(e){
                console.log('push error ',e);
            }
        })
        .catch( (error) => {
            console.log('not got from database')
            responseData.message=`Error fetching waste request because ${error}`,
            responseData.status=404
        });
        
        
    } 
    
    console.log('finished');
    console.log('responesData\n',responseData.body);
    return responseData;       
}