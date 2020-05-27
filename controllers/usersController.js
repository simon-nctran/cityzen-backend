/* get module of users model*/
const mongoose = require('mongoose');
const users = mongoose.model('users')

/* find all users and send response to client*/
const getAllUsers = (req, res) => {
  users.find({}, function(err,data){
    console.log(data);
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.json(data);
    }
  });
};

/* find a user by username*/
const getUsersByUsername = (req, res) => {
  users.findOne({ username: req.params.username }, function(err,data){
    console.log(data);
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      if (!data) {
        res.send("User not found");
      } else{
        res.json(data);
      }
    }
  });
}

/*/!* check the login, i.e password matches if username exists, if username unregistered in database,
 * send back the corresponding warning message*!/
const loginCheck = (req, res) => {
  users.findOne({ username: req.body.username }, function(err, data) {
      if (data == null) {
        res.send("Username not found");
      }

      else {
        if (req.body.password === data.password) {
          res.send("Login successful")
        } else {
          res.send("Invalid password");
        }
      }
  });
}*/

const bcrypt = require('bcrypt');
const saltRounds = 10;

const loginCheck = (req, res) => {
  users.findOne({ username: req.body.username }, function(err, data) {
    if (data == null) {
      res.send("Username not found");
    }

    else {
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        if (result === true) {
          res.send('Login successful');
        } else {
          res.send('Incorrect password');
        }
      });
    }
  });
}
const addUser = function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const data = new users({
      username: req.body.username,
      password: hash,
      emailAddress: req.body.emailAddress
    });
    data.save();
    res.send("Registration successful");
  });
};

/*
/!* register a new user into database*!/
const addUser = function (req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password,
    emailAddress: req.body.emailAddress
  };

  if (req.body.username == null) {
    res.send("Please provide a username");
  } else if (req.body.password == null) {
    res.send("Please provide a password");
  } else if (req.body.emailAddress == null) {
    res.send("Please provide an email address");
  }

  users.findOne({ username: req.body.username}, function(err,data) {
    if (data != null) {
      res.send("Username already exists");
    } else {
        const data = new users(user);
        data.save();
        res.send("Registration successful");
    }
  });
};
*/

module.exports = {
  getAllUsers,
  getUsersByUsername,
  addUser,
  loginCheck
};
