const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

/**
 * serialize the user using passport. this is a user record id created by
 * MongoDB. This id is used to create the cookie to identify the subsequent id.
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Deserializion logic to fetch the mongodb user record from the id
 * that is retrieved from the Cookie
 */
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accesToken, refreshToken, profile, done) => {
      // query MongoDB to see if this person alreay has this profileID. if present, no record required.
      // User.findOne returns a promise,
      User.findOne({ googleId: profile.id }).then(existingUser => {
        // if no user, existingUser is null
        if (existingUser) {
          // we already have a record with the profileId
          done(null, existingUser);
        } else {
          // Create a new User( record in the users collection in mongoDb)
          let newUser = new User({ googleId: profile.id });
          // we will need to save(persist) this new user to save it to the mongoDB
          newUser.save().then(user => done(null, user));
        }
      });
    }
  )
);
