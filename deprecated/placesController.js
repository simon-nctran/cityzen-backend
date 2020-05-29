// provide the controller a link to the places model
let places = require("./places");

// Function to handle a request to get all places
const getAllPlaces = (req, res) => {
  res.send(places); // return the list of places
};

// Function to handle a request to get all places that have the tag
const getPlaceByTag = (req, res) => {
  const list = places.filter((places) =>
    places.tag.some((tag) => tag === req.params.tag)
  );

  if (list) {
    res.send(list);
  } else {
    res.send([]);
  }
};

// Remember to export the callbacks
module.exports = {
  getAllPlaces,
  getPlaceByTag,
};
