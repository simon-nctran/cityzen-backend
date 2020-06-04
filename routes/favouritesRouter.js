const express = require("express");

// Create Router
const favouritesRouter = express.Router();

// Require UsersController
const favouritesController = require("../controllers/favouritesController");

// Require authChecker
const authChecker = require("../middleware/auth");

favouritesRouter.get("/", authChecker, (req, res) =>
  favouritesController.getAllFavourites(req, res)
);
favouritesRouter.post("/", authChecker, (req, res) => favouritesController.addFavourite(req, res));
// favouritesRouter.delete("/:id", authChecker, (req, res) => favouritesController.deleteFavourite(req, res) )
favouritesRouter.delete("/:id", authChecker, (req, res) => favouritesController.deleteFavourite(req, res));

module.exports = favouritesRouter;
