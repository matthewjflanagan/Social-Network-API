const mongoose = require('mongoose');

// Construct a new instance of the schema class
const reactionSchema = new mongoose.Schema({
    // Configure individual properties using Schema Types
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
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
})

module.exports = reactionSchema;