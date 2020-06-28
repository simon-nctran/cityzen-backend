require("dotenv").config();
const mongoose = require("mongoose");

/* provide the link to the database */
const uri =
  "mongodb+srv://Yutao:" +
  process.env.MONGO_PASSWORD +
  "@cluster0-diojo.mongodb.net/test?retryWrites=true&w=majority";

/* connect to the database */
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  // Options (second parameter) are included to remove deprecation warnings
  // https://mongoosejs.com/docs/deprecations.html
  // Additional note: connect resolves to "this" if connection succeeded (i.e. nothing of value)
  // https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(`Could not connect to MongoDB: ${err.message}`)); // Note: all errors have error.message property

require("./users");
