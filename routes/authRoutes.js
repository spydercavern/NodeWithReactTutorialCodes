const passport = require("passport");

module.exports = app => {
  // default router for testing
  app.get("/", (req, res) => {
    res.send({ hi: "hello there, how are you doing?" });
  });

  // express end point for handling the google authentication,
  // use passsport to handle the callback function
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // callback handler for google
  app.get("/auth/google/callback", passport.authenticate("google"));

  /**
   * Whenever a request is valid and authenticated, passport module will add a request -> user property to the request object,
   * This is a request handler to check this parameter
   */
  app.get("/api/currentUser", (req, res) => {
    res.send(req.user);
  });

  /**
   * logout handler for the application.
   * Passport also adds additional functions to the request object
   * this removes the request user object from request object.
   */
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
