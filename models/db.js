require("dotenv").config();
// https://www.npmjs.com/package/dotenv
const mongoose = require("mongoose");

/* provide the link to the database */
const uri =
  "mongodb+srv://Yutao:wangyutao123@cluster0-diojo.mongodb.net/test?retryWrites=true&w=majority";

/* connect to the database */
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // dbName: "<insert_name>",  you can put name of database as listed on MongoDB atlas to be more specific
  })
  // Options (second parameter) included to remove deprecation warnings
  // https://mongoosejs.com/docs/deprecations.html
  // Bonus Note: connect resolves to "this" if connection succeeded (i.e. nothing of value)
  // https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(`Could not connect to MongoDB: ${err.message}`)); // Note: all errors have error.message property

require("./users");
