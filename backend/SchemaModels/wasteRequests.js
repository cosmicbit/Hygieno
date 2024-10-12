const mongoose  = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const wasteRequests = new Schema({

    userId:{
        type : ObjectId,
        required:true
    },
    disposername:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
 
    collector:{
        type:ObjectId,
        required:true
    },

    desc:{
        type:String
    },

    status:{
        type:String,
        required:true
    },

    wasteTypes:{
        type:[String],
        required:true
    },

    image:{
        type:String,
        required:true
    },

    collectionArea : {
        type: ObjectId
    },
    location:
    {
        type:{
            type: String,
            required:true
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            validate: {
                validator: function (value) {
                    return Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number';
                },
                message: 'Coordinates must be an array of two numbers [longitude, latitude].'
            },
            required:true
        }   
    },
    collectionArea:{
        type : ObjectId,
        required:true
    }
})


wasteRequests.index({ location: '2dsphere' });
const WasteRequest = mongoose.model('wasterequests', wasteRequests);
module.exports = WasteRequest;
