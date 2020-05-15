const express = require("express");

// add Router
const usersRouter = express.Router();

// get usersController module
const usersController = require("../controllers/usersController");

/**
 * Usage:
 * getAllUsers: send a get request to ../users with empty body
 * getUsersByUsername: send a get request to ../users/profile with body {username: "hello"}
 * addUser: send a post request to ../users/insert-user with data about new user followed by json format
 * loginCheck: send a get request to ../users/login with {username: "username", password: "password"}
 */
/

usersRouter.get("/", (req, res) => usersController.getAllUsers(req, res));
usersRouter.get("/profile", usersController.getUsersByUsername);
usersRouter.post("/insert-user", usersController.addUser);
usersRouter.get("/login", usersController.loginCheck);
module.exports = usersRouter;

// handle GET requests at the root of the path
/*usersRouter.get("/:username", (req, res) =>
  usersController.getUsersByUsername(req, res)
);*/

// handle POST requests at root of path
// refer: https://youtu.be/pKd0Rpw7O48?t=1811
/*
usersRouter.post("/", (req, res) => usersController.addUser(req, res));
*/
