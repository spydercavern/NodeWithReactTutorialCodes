// in mongo db there is a collection that has multiple records.
const mongoose = require("mongoose");
// schema is all the keys that are possible in the records in the collection
const { Schema } = mongoose;

// define a user Schema that has the following keys and its types
const userSchema = new Schema({
  googleId: String
});

// this will create  a new collection called users and associate userSchema as the
// record structure. Although mongoDB does not specify this requirement,
// it is a requirement from mongoose.

// if the collection exists it re-uses the collection. We can at a later point of time,
// add or remove additional entries in the userSchema.
mongoose.model("users", userSchema);
