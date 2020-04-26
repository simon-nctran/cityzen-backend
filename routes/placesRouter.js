const express = require("express");

// add router
const placesRouter = express.Router();

// require the controller
const placesController = require("../controllers/placesController");

// handle the GET request on root of places path
placesRouter.get("/", (req, res) => placesController.getAllPlaces(req, res));
placesRouter.get("/:tag", (req, res) =>
  placesController.getPlaceByTag(req, res)
);

// export the router
module.exports = placesRouter;
