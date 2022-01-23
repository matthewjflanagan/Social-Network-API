// Require schema and model from mongoose
const { Schema, model } = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new Schema({
  // Configure individual properties using Schema Types
  username: { 
    type: String, 
    unique: true, 
    required: true, 
    trim: true 
  },
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
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,

}
);

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const User = model('User', userSchema);
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

module.exports = User;


