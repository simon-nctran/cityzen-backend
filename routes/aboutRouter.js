const express = require('express');

// add router
const aboutRouter = express.Router();

// require the controller
const aboutController = require('../controllers/about');

// handle the GET request on root of about path
aboutRouter.get('/', (req, res) => aboutController.getAbout(req, res));

// export the router
module.exports = aboutRouter;