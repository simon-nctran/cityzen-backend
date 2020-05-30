/* eslint-disable no-underscore-dangle,func-names */
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/* create a userSchema */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    searchOptions: [{ origin: String, destination: String, poi: String, mode: String }],
  },
  { collection: "users" }
);

userSchema.methods.generateAuthToken = function () {
  // use function () instead of () => because "this" should not be bound to users.js.
  // in simple terms, () => will mess with what "this" is expected to reference
  const token = jwt.sign({ _id: this._id }, "myprivatekey");
  return token;
};

/* Unused ?
// create a user schema password checking function
userSchema.methods.checkPassword = (password) => {
  return password === this.password;
};

/* assign the schema */
const users = mongoose.model("users", userSchema);
module.exports = users;
