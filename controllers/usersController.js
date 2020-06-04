/* eslint-disable no-underscore-dangle */

// the bcrypt encryption part is based on
// https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Express 4.x API docs: http://expressjs.com/en/4x/api
// res.send vs res.json: https://medium.com/@punitkmr/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf
// // basically res.send calls res.json if data is object. res.json converts everything to json and sends

// Mongoose API docs: https://mongoosejs.com/docs/guide.html
// This is for methods called by Users class
const Users = require("../models/users");

// Status Codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

/* find all users and send response to client */
const getAllUsers = (req, res) => {
  Users.find({}, (findErr, data) => {
    // console.log(data);
    if (findErr) {
      res.render("findErr", {
        status: 500,
      });
    } else {
      res.json(data);
    }
  });
};

/* find a user by user id received from JWT */
const getUserByID = async (req, res) => {
  const user = await Users.findById(req.user._id).select("-password -_id");
  // .findByID is mongoose method that searches for item by their MongoDB ID
  // `user._id` property was added to `req` by auth.js middleware (refer to the .get call in usersRouter)
  // .select() is a mongoose method that excludes/includes certain data from retrieval
  // https://mongoosejs.com/docs/api.html#query_Query-select
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User not found");
    // .status sets the status
    // status 404 means resource not found
  }
};

/*
const getUsersByUsername = (req, res) => {
  Users.findOne({ username: req.params.username }, (findErr, data) => {
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
 */

// check the login, i.e password matches if username exists, if username unregistered in database,
// send back the corresponding warning message
const authenticateLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const userMatch = await Users.findOne({ username });
    if (!userMatch) {
      res.status(404).send("Username not found");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, userMatch.password);
    if (!passwordMatch) {
      res.status(401).send("Incorrect Password");
      return;
    }

    const token = await userMatch.generateAuthToken();
    res
      .set("x-auth-token", token)
      // .set sets the headers
      .set("Access-Control-Expose-Headers", "x-auth-token")
      // Need to include this header because: https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields
      .send("Login successful");
  } catch (err) {
    res.status(500).send("Login failed due to unknown cause");
    console.error(err);
  }

  /* 
  Users.findOne({ username: req.body.username }, (findErr, data) => {
    if (data == null) {
      res.send("Username not found");
    } else {
      bcrypt.compare(req.body.password, data.password, (bcryptErr, result) => {
        if (result === true) {
          res.send("Login successful");
        } else {
          res.send("Incorrect password");
        }
      });
    }
  });
  
   */
};

// register a new user into database
const addUser = async (req, res) => {
  // validate input
  if (req.body.username == null) {
    res.status(400).send("Please provide a username");
    return;
  }
  if (req.body.password == null) {
    res.status(400).send("Please provide a password");
    return;
  }

  try {
    // find if username already exists
    const existingUser = await Users.findOne({ username: req.body.username });
    if (existingUser) {
      res.status(400).send("Username already exists");
      return;
    }

    const newUser = new Users({
      username: req.body.username,
      password: req.body.password,
    });

    newUser.password = await bcrypt.hash(req.body.password, saltRounds);

    await newUser.save();

    const token = newUser.generateAuthToken();
    res
      .set("x-auth-token", token)
      // .set sets the headers
      .set("Access-Control-Expose-Headers", "x-auth-token")
      // Need to include this header because: https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields
      .send("Registration successful");
  } catch (err) {
    res.status(500).send("Registration failed due to unknown reason");
    console.log(err);
  }

  /*
  bcrypt.hash(req.body.password, saltRounds, (bcryptErr, hash) => {
    const newUser = new Users({
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

    Users.findOne({ username: req.body.username }, (findErr, result) => {
      if (result != null) {
        res.send("Username already exists");
      } else {
        newUser.save();
        res.send("Registration successful");
      }
    });
  });
   */
};

// update is only available for updating search Options
const updateUser = (req, res) => {
  const conditions = {
    username: req.body.username,
  };

  const update = {
    searchOptions: req.body.searchOptions,
  };

  Users.findOneAndUpdate(conditions, update, (findErr, result) => {
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
  getUserByID,
  addUser,
  authenticateLogin,
  updateUser,
};
