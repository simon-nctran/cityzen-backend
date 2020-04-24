// provide the controller a link to the about model
var about = require('../models/about');

// Function to handle a request to get the about information
const getAbout = (req, res) => {
    res.send(about);
};

// export the callbacks
module.exports = {
    getAbout,
}