/* eslint-disable no-underscore-dangle */

// Mongoose API docs: https://mongoosejs.com/docs/guide.html
// This is for methods called by Users class
const Users = require("../models/users");

// Express 4.x API docs: http://expressjs.com/en/4x/api
// res.send vs res.json: https://medium.com/@punitkmr/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf
// // basically res.send calls res.json if data is object. res.json converts everything to json and sends

// Status Codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

const poiOptions = ["Coffee", "Toilet", "Food", "Shopping", "Fuel", "Accommodation"];
const modeOptions = ["Driving", "Cycling", "Walking"];

const getAllFavourites = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    res.status(200).send(user.searchOptions);
  } catch (err) {
    res.status(500).send("Failed to retrieve favourites due to server error");
    console.log("Error at getAllFavourites:");
    console.log(err);
  }
};

// Add a favourite to a user's list
const addFavourite = async (req, res) => {
  // Validate input
  if (!req.is("application/json")) {
    // http://expressjs.com/tr/api.html#req.is
    res.status(400).send("Request content/body is not in JSON format");
  }

  const { origin, destination, poi, mode } = req.body;
  if (!origin || !destination || !poi || !mode) {
    res.status(400).send("One or more options is missing");
    return;
  }

  if (!poiOptions.includes(poi)) {
    // Array.includes: https://www.w3schools.com/jsref/jsref_includes_array.asp
    res.status(400).send("Provided POI is not a valid option");
    return;
  }

  if (!modeOptions.includes(mode)) {
    res.status(400).send("Provided Mode is not a valid option");
    return;
  }

  try {
    await Users.findByIdAndUpdate(req.user._id, { $push: { searchOptions: req.body } });
    // I honestly have no idea how the $push stuff really works
    // https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    // https://docs.mongodb.com/manual/reference/operator/update/push/
    res.status(200).send("Successfully added favourite");
  } catch (err) {
    res.status(500).send("Failed to add favourite due to server error");
    console.log("Error at addFavourite:");
    console.log(err);
  }
};

module.exports = {
  getAllFavourites,
  addFavourite,
};
