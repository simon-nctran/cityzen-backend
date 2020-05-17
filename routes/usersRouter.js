const express = require("express");

/*
 * add Router
*/
const usersRouter = express.Router();

/*
 *get usersController module
*/
const usersController = require("../controllers/usersController");

usersRouter.get("/", (req, res) => usersController.getAllUsers(req, res));
usersRouter.get("/:username", (req, res) => usersController.getUsersByUsername(req, res));
usersRouter.post("/new", (req, res) => usersController.addUser(req, res));
usersRouter.post("/login", (req, res) => usersController.loginCheck(req, res));

module.exports = usersRouter;
