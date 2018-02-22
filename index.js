// common js modules in the server as nodejs has only support for modules
// node js do not have in built support for es2015 modules natively yet.

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
// instantiate an express app
const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accesToken, refreshToken, profile, done) => {
      console.log('accesssToken', accesToken);
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);

// we are using heroku hosting, so whenever heroku runs it injects the PORT value to the environment variables.
const PORT = process.env.PORT || 5000;

// default router for testing
app.get('/', (req, res) => {
  res.send({ hi: 'hello there, how are you doing? test for Dev ' });
});

// express end point for handling the google authentication,
// use passsport to handle the callback function
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// callback handler for google
app.get('/auth/google/callback', passport.authenticate('google'));

// start express app to listen to this port.
app.listen(PORT);
