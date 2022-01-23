const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Construct a new instance of the schema class
const thoughtSchema = new Schema({
    // Configure individual properties using Schema Types
    thoughtText: { 
      type: String, 
      required: true, 
      min: [1 , "Type more characters!!"],
      max: [280 , "Whoaaa slow down there, that's too many characters"] 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: (date) => {
        moment(date).format('MMMM Do YYYY')
      }
    },
    username:
      {
        type: String,
        required: true,
      },
      reactions: [
        reactionSchema
      ],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false,
    }
  );

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const Thought = model('Thought', thoughtSchema);
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

module.exports = Thought;