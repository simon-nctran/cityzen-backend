// get module of users model
let users = require("../models/users");

// function to handle a request to get all users
const getAllUsers = (req, res) => {
  res.send(users); // return the list of users
};

const getUsersByUsername = (req, res) => {

  const user = users.find(user => user.username === req.params.username);

  if (user) {
    res.send(user);
  }
  else {
    res.send([]);
  }
};

// refer: https://youtu.be/pKd0Rpw7O48?t=1811
function addUser(req, res) {
  // define json object with the properties from req.body individually (as opposed to 'const new_user = req.body')
  // this is so we can have validation checking on the individual properties
  const new_user = {
    username: req.body.username,
    birthYear: req.body.birthYear,
    miscInfo: req.body.miscInfo,
  };
  //console.log(new_user);
  if (users.some((user) => user.username === new_user.username)) {
    //Array.some: https://stackoverflow.com/a/8217584 (used to check if a value exists anywhere in an array)
    res.send("username already exists");
    //console.log(users);
    return;
  }
  users.push(new_user);
  //console.log(users);
  res.send(users);
}

module.exports = {
  getAllUsers,
  getUsersByUsername,
  addUser,
};
