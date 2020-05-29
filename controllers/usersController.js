/* get module of users model */
const mongoose = require("mongoose");

const users = mongoose.model("users");

/* find all users and send response to client */
const getAllUsers = (req, res) => {
  users.find({}, (err, data) => {
    console.log(data);
    if (err) {
      res.render("error", {
        status: 500,
      });
    } else {
      res.json(data);
    }
  });
};

/* find a user by username */
const getUsersByUsername = (req, res) => {
  users.findOne({ username: req.params.username }, (err, data) => {
    console.log(data);
    if (err) {
      res.render("error", {
        status: 500,
      });
    } else if (!data) {
      res.send("User not found");
    } else {
      res.json(data);
    }
  });
};

/* /!* check the login, i.e password matches if username exists, if username unregistered in database,
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
} */

// the bcrypt encryption part is based on
// https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
const bcrypt = require("bcrypt");

const saltRounds = 10;

const loginCheck = (req, res) => {
  users.findOne({ username: req.body.username }, (err, data) => {
    if (data == null) {
      res.send("Username not found");
    } else {
      bcrypt.compare(req.body.password, data.password, (err, result) => {
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
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const data = new users({
      username: req.body.username,
      password: hash,
    });

    if (req.body.username == null) {
      res.send("Please provide a username");
      return;
    }
    if (req.body.password == null) {
      res.send("Please provide a password");
      return;
    }

    users.findOne({ username: req.body.username }, (err, result) => {
      if (result != null) {
        res.send("Username already exists");
      } else {
        data.save();
        res.send("Registration successful");
      }
    });

    // data.save();
    // res.send("Registration successful");
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

  users.findOneAndUpdate(conditions, update, (error, result) => {
    if (error) {
      res.send("update unsuccessful");
    } else {
      console.log(result);
      res.send("update successful");
    }
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
  loginCheck,
  updateUser,
};
