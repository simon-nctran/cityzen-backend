const mongoose = require("mongoose");

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

/* create a user schema password checking function */
userSchema.methods.checkPassword = (password) => {
  return password === this.password;
};

/* assign the schema */
const user = mongoose.model("users", userSchema);
module.exports = user;
