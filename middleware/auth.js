/* eslint-disable dot-notation */
require("dotenv").config();
const jwt = require("jsonwebtoken");
// Reference for JWT authentication: https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
// Additional reference: https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122

module.exports = (req, res, next) => {
  // get the token from the header if present
  const token = req.headers["x-auth-token"];
  // if no token found, return response (without going to the next middleware)
  if (!token) {
    res.status(401).send("No authorisation token provided");
    return;
  }

  try {
    // if can verify the token, set req.user and pass to next middleware
    const decodedUser = jwt.verify(token, process.env.JWT_KEY);
    req.user = decodedUser;
    next();
  } catch (err) {
    // if invalid token
    res.status(400).send("Invalid or expired authorisation token");
  }
};
