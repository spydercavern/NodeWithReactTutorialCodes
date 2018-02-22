const passport = require('passport');

module.exports = (app) => {
  // default router for testing
  app.get('/', (req, res) => {
    res.send({ hi: 'hello there, how are you doing?' });
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
};
