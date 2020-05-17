const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* create a userSchema*/
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  emailAddress: String
}, {collection: 'users'});

/* create a user shema password checing function*/
userSchema.methods.checkPassword = function(password) {
  return (password === this.password);
};

/* assign the schema*/
const user = mongoose.model('users', userSchema);
module.exports = user;
