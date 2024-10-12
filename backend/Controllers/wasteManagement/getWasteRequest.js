const waste  = require('../../SchemaModels/wasteRequests')
const User  = require('../../SchemaModels/userSchema')
const { default: mongoose } = require('mongoose')

module.exports.getWasteRequest = async ( data ) => {

    let responseData = {
        status:Number,
        message:String,
        wasteData:[Object]
      } 
   
   const id = new mongoose.Types.ObjectId(data);
   await waste.aggregate([
        {
            $match: {
                userId: id
            }
        },
        {
            $lookup:{
                from: "collectorusers",
                localField: "collector",
                let: { cID : "$collector"},
                foreignField: "_id",
                pipeline : [
                  {
                    $match : {
                      $expr : {
                        $eq : ["$$cID","$_id"]
                      }
                    }
                  },
                    {
                    $project:{
                      "_id":0,
                      "firstName":1,
                      "middleName":1,
                      "lastName":1,
                      "phoneNo":1
                    }
                  }
                ],
                as: "collectorDetails",
              }
        }
        ,
        {
            $sort:{
                date: -1
            }
        }

    ]).then( ( data )=> {
     //   console.log(data );
        responseData.message="Successfully fetched your orders",
        responseData.status=200,
        responseData.wasteData = data
    }).catch( (error) => {
       // console.log(error)
        responseData.message=`Error fetching your orders because ${error}`,
        responseData.status=404,
        responseData.wasteData=[]

})
      


    /*
    await waste.find( { userId:data } ).sort({date:-1}) .then( ( data )=> {
            console.log(data);
            responseData.message="Successfully fetched your orders",
            responseData.status=200,
            responseData.wasteData = data
        }).catch( (error) => {
            console.log(error)
            console.log("Internet Down");
            responseData.message=`Error fetching your orders because ${error}`,
            responseData.status=404,
            responseData.wasteData=[]

    })*/
    return responseData;       
}
