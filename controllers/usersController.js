// the bcrypt encryption part is based on
// https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRounds = 10;
const users = mongoose.model("users");

/* find all users and send response to client */
const getAllUsers = (req, res) => {
  users.find({}, (findErr, data) => {
    console.log(data);
    if (findErr) {
      res.render("findErr", {
        status: 500,
      });
    } else {
      res.json(data);
    }
  });
};

/* find a user by username */
const getUsersByUsername = (req, res) => {
  users.findOne({ username: req.params.username }, (findErr, data) => {
    console.log(data);
    if (findErr) {
      res.render("findErr", {
        status: 500,
      });
    } else if (!data) {
      res.send("User not found");
    } else {
      res.json(data);
    }
  });
};

// check the login, i.e password matches if username exists, if username unregistered in database,
// send back the corresponding warning message
const loginCheck = (req, res) => {
  users.findOne({ username: req.body.username }, (findErr, data) => {
    if (data == null) {
      res.send("Username not found");
    } else {
      // noinspection JSUnresolvedVariable
      bcrypt.compare(req.body.password, data.password, (bcryptErr, result) => {
        if (result === true) {
          res.send("Login successful");
        } else {
          res.send("Incorrect password");
        }
      });
    }
  });
};

// register a new user into database
const addUser = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (bcryptErr, hash) => {
    const data = {
      username: req.body.username,
      password: hash,
    };

    if (req.body.username == null) {
      res.send("Please provide a username");
      return;
    }
    if (req.body.password == null) {
      res.send("Please provide a password");
      return;
    }

    users.findOne({ username: req.body.username }, (findErr, result) => {
      if (result != null) {
        res.send("Username already exists");
      } else {
        data.save();
        res.send("Registration successful");
      }
    });
  });
};

// update is only available for updating search Options
const updateUser = (req, res) => {
  const conditions = {
    username: req.body.username,
  };

  const update = {
    searchOptions: req.body.searchOptions,
  };

  users.findOneAndUpdate(conditions, update, (findErr, result) => {
    if (findErr) {
      res.send("update unsuccessful");
    } else {
      console.log(result);
      res.send("update successful");
    }
  });
};

module.exports = {
  getAllUsers,
  getUsersByUsername,
  addUser,
  loginCheck,
  updateUser,
};
