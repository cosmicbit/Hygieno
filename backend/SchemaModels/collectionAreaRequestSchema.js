const mongoose  = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const collectionAreaRequests = new Schema({

    userId:{
        type : ObjectId,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },

    wasteTypes:{
        type:[String],
        required:true
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
    area:{
        type: String,
        required:true
    }
})


collectionAreaRequests.index({ location: '2dsphere' });
const CollectionAreaRequests = mongoose.model('collectionareas', collectionAreaRequests);

module.exports = CollectionAreaRequests;