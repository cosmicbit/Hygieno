const express = require('express');
const router = express.Router();

const User  = require('../SchemaModels/userSchema')
const carea  = require('../SchemaModels/collectionAreaRequestSchema')

router.post('/findCollectors',async (req,res) => {
    const data = req.body;
    console.log("find collectors");
    console.log(data); 
 
    for( let i=1; i<=4; i++){
        const approxDis = [];
        console.log(i*5 + "radius");
       // var nearC = await carea.find({location:{ $geoWithin: {$centerSphere : [ [data.lon,data.lat] , i*5/6378.1]} }});
       var nearC = await carea.aggregate([
        {
            $match: {
                location:{ $geoWithin: {$centerSphere : [ [data.lon,data.lat] , i*5/6378.1]}}
            }
        },
        {
            $lookup:{
                from: "collectorusers", 
                localField: "userId",
                let: { cID : "$userId"},
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

    ])
        if(nearC.length === 0)
            continue;
        else
        {
            break;
        } 
    }

    if(nearC.length === 0)
    { 
        console.log("No nearby collectors");
        res.status(500).send('0');
    }
    else 
    {
        console.log(nearC)
        res.status(200).send(nearC);
    }
})
module.exports = router;