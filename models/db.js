const mongoose = require("mongoose");

/* provide the link to the database */
const uri =
  "mongodb+srv://Yutao:wangyutao123@cluster0-diojo.mongodb.net/test?retryWrites=true&w=majority";

/* connect to the database */
mongoose.connect(uri, (err) => {
  if (!err) {
    console.log("Connected to mongo.");
  } else {
    console.log("Failed to connect to mongo!", err);
  }
});

require("./users.js");
