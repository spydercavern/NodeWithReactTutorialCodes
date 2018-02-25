// common js modules in the server as nodejs has only support for modules
// node js do not have in built support for es2015 modules natively yet.

const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/User");
require("./services/passport");

// instantiate an express app
const app = express();

//----------------- START of Middleware ------------------
/**
 * These are express middleware for the express app. Any time a request comes in they are
 * piped through the middleware and performs some action to it. for eg., extracting the cookie.
 * These are similar to the filters in the Java application
 */

/**
 * Use the Cookie using the module - cookieSession, where we define what the max age and the encryption
 * for the cookie.
 */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

/**
 *
 */
app.use(passport.initialize());
/**
 *
 */
app.use(passport.session());
//----------------- END of Middleware ------------------

// connect to the mongo db
mongoose.connect(keys.mongoURI);

// use the routes defined in the authRoutes and initialize to use with the express app
require("./routes/authRoutes")(app);

// we are using heroku hosting, so whenever heroku runs it injects the PORT value to the environment variables.
const PORT = process.env.PORT || 5000;

// start express app to listen to this port.
app.listen(PORT);
