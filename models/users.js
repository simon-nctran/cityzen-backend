/*
// array of json objects representing users
const users = [
  {
    username: "unimelb",
    birthYear: "1853",
    miscInfo: "Is very old",
  },
];

module.exports = users;
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  emailAddress: String
}, {collection: 'users'});

userSchema.methods.checkPassword = function(password) {
  return (password === this.password);
};

const user = mongoose.model('users', userSchema);
module.exports = user;
