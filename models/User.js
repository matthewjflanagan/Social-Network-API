// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  username: { type: String, unique: true, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Friend',
      }],
});

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const User = mongoose.model('User', userSchema);

module.exports = User;


