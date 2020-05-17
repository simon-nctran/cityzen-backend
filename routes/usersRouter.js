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

usersRouter.get("/profile/:username", (req, res) =>
    usersController.getUsersByUsername(req, res)
);
usersRouter.post("/new", usersController.addUser);
usersRouter.post("/login", usersController.loginCheck);
module.exports = usersRouter;

