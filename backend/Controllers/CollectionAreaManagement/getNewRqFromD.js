const collectionarea  = require('../../SchemaModels/collectionAreaRequestSchema')

const waste  = require('../../SchemaModels/wasteRequests')

module.exports.getNewRqFromD = async ( data ) => {
    console.log('hej');
    let responseData = {
        status:Number,
        message:String,
        newRqFromD:new Array()
    }
    
    const w = await waste
        .find(
        {collector:data, status:'Pending Collection'});
    console.log('w ',Object.keys(w).length);

    const ca = await collectionarea
        .find( 
        { userId:data } );
    console.log('ca ',Object.keys(ca).length);
   
    for (let i of ca){
        let eachCA = {
            id:i._id,
            area: i.area,
            newRequests_ids: [],
            newRequests_dates: [],
            newRequests_disposernames:[],
            newRequests_images:[],
            wasteTypes: i.wasteTypes,
            date: i.date
        };
        let k=0;
        for(let j of w){
            if(JSON.stringify(i._id)===JSON.stringify(j.collectionArea)){
                try{
                    eachCA.newRequests_ids.push(j._id);
                    eachCA.newRequests_disposernames.push(j.disposername);
                    eachCA.newRequests_dates.push(j.date);
                    
                    eachCA.newRequests_images.push(j.image);
                        
                    eachCA.nofNewRqFromD=++k;
                    
                }catch(e){
                    console.log(e);
                }
            }
            
        }
        if(k!=0){
            responseData.newRqFromD.push(eachCA);
        }
    
    }
    console.log('finished');
    return responseData;       
}