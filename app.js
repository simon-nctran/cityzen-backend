const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// use middleware for parsing JSON in req.body
// refer: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
// refer: https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json
// refer: https://expressjs.com/en/api.html#req.body
// refer: https://expressjs.com/en/guide/using-middleware.html
// refer: https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json());

require("./models/db.js");
// Note: what require() does is run the code in the file given as the argument

// set up routes
// DEPRECATED: const aboutRouter = require("./deprecated/aboutRouter");
// DEPRECATED: const placesRouter = require("./deprecated/placesRouter");
const usersRouter = require("./routes/usersRouter");

// Get home page
app.get("/", (req, res) => {
  res.send("<H1>Cityzen Home Page</H1>");
});

// handle routes
// DEPRECATED: app.use("/about", aboutRouter);
// DEPRECATED: app.use("/places", placesRouter);
app.use("/users", usersRouter);

// have the server listen for requests
const port = process.env.PORT || 3001;
// use environment port or port 3001
// refer: https://youtu.be/pKd0Rpw7O48?t=989
app.listen(port, () => {
  console.log(`Cityzen Backend is listening on port ${port}`);
});

module.exports = app;
