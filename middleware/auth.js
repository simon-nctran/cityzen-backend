/* eslint-disable dot-notation */
const jwt = require("jsonwebtoken");
// Reference for JWT: https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8

// IMPORTANT: next is a parameter that takes in the next function
// the .get/post request will handle placing a function in
module.exports = (req, res, next) => {
  // get the token from the header if present
  const token = req.headers["x-auth-token"] || req.headers["authorization"];
  // if no token found, return response (without going to the next middleware)
  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    // if can verify the token, set req.user and pass to next middleware
    const decodedUser = jwt.verify(token, "myprivatekey");
    req.user = decodedUser;
    next();
  } catch (err) {
    // if invalid token
    res.status(400).send("Invalid token.");
  }
};
