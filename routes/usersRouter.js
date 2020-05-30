const express = require("express");

// Create Router
const usersRouter = express.Router();

// Require UsersController
const usersController = require("../controllers/usersController");

// Require authChecker
const authChecker = require("../middleware/auth");

usersRouter.get("/", (req, res) => usersController.getAllUsers(req, res));
usersRouter.get("/data", authChecker, (req, res) => usersController.getUserByID(req, res));
usersRouter.post("/new", (req, res) => usersController.addUser(req, res));
usersRouter.post("/login", (req, res) => usersController.authenticateLogin(req, res));
usersRouter.put("/update", (req, res) => usersController.updateUser(req, res));

module.exports = usersRouter;
