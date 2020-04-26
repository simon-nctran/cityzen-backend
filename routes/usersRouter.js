const express = require("express");

// add Router
const usersRouter = express.Router();

// get usersController module
const usersController = require("../controllers/usersController");

// handle GET requests at the root of the path
usersRouter.get("/", (req, res) => usersController.getAllUsers(req, res));
usersRouter.get("/:username", (req, res) =>
  usersController.getUsersByUsername(req, res)
);

// handle POST requests at root of path
// refer: https://youtu.be/pKd0Rpw7O48?t=1811
usersRouter.post("/", (req, res) => usersController.addUser(req, res));

module.exports = usersRouter;
