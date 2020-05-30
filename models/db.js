const mongoose = require("mongoose");

/* provide the link to the database */
const uri =
  "mongodb+srv://Yutao:wangyutao123@cluster0-diojo.mongodb.net/test?retryWrites=true&w=majority";

/* connect to the database */
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  // Options (second parameter) included to remove deprecation warnings
  // Bonus Note: connect resolves to "this" if connection succeeded (i.e. nothing of value)
  // https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(`Could not connect to MongoDB: ${err.message}`)); // all errors have error.message property

require("./users.js");
