/* eslint-disable no-underscore-dangle,func-names */
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/* create a userSchema */
const usersSchema = new mongoose.Schema(
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

usersSchema.methods.generateAuthToken = function () {
  // use function () instead of () => because "this" should not be bound to users.js.
  // in simple terms, () => will mess with what "this" is expected to reference
  const token = jwt.sign({ _id: this._id }, "myprivatekey");
  return token;
};

/* Unused ? @Jack, what is this?
// create a user schema password checking function
userSchema.methods.checkPassword = (password) => {
  return password === this.password;
};

/* assign the schema */
const users = mongoose.model("users", usersSchema);
module.exports = users;
