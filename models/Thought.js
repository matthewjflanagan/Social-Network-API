const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

// Construct a new instance of the schema class
const thoughtSchema = new mongoose.Schema({
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
    username: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
      }],
      reactions: [
        reactionSchema
      ],
  });

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;