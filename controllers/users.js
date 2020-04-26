// get module of users model
let users = require("../models/users");

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
    //array.some: https://stackoverflow.com/a/8217584
    res.send("username already exists");
    //console.log(users);
    return;
  }
  users.push(new_user);
  //console.log(users);
  res.send(users);
}

module.exports = {
  addUser,
};
