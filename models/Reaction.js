const { Schema, Types } = require('mongoose');
const moment = require('moment');

// Construct a new instance of the schema class
const reactionSchema = new Schema({
    // Configure individual properties using Schema Types
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        required: true,
        max: [280 , "Whoaaa slow down there, that's too many characters"],
    },
    username:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now, 
        get: (date) => {
          moment(date).format('MMMM Do YYYY')
        }
    }
},
{
    toJSON: {
        getters: true,
    },
    id: false,
    }
);

module.exports = reactionSchema;