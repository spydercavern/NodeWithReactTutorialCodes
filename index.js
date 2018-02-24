// common js modules in the server as nodejs has only support for modules
// node js do not have in built support for es2015 modules natively yet.

const express = require("express");
const mongoose = require("mongoose");
require("./services/passport");
const keys = require("./config/keys");
require("./models/User");

// instantiate an express app
const app = express();

// connect to the mongo db
mongoose.connect(keys.mongoURI);

// use the routes defined in the authRoutes and initialize to use with the express app
require("./routes/authRoutes")(app);

// we are using heroku hosting, so whenever heroku runs it injects the PORT value to the environment variables.
const PORT = process.env.PORT || 5000;

// start express app to listen to this port.
app.listen(PORT);
