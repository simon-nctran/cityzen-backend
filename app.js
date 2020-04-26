const express = require("express");
const app = express();

// use middleware for parsing JSON in req.body
// refer: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
// refer: https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json
// refer: https://expressjs.com/en/api.html#req.body
// refer: https://expressjs.com/en/guide/using-middleware.html
// refer: https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json());

// set up routes
const aboutRouter = require("./routes/aboutRouter");
const placesRouter = require("./routes/placesRouter");
const usersRouter = require("./routes/usersRouter");

// Get home page
app.get("/", (req, res) => {
  res.send("<H1>Cityzen</H1>");
});

// handle routes
app.use("/about", aboutRouter);
app.use("/places", placesRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("The cityzen app is listening on port 3000");
});
