const passport = require("passport");
const mongoose = require('mongoose');

module.exports = app => {
  // GOOGLE
  // route handler for handling return from the google server
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/bookings");
    }
  );

  // FACEBOOK
  app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

  app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {

    res.redirect("/");
  }
  );

  // General
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    // passport automatically attacts user to the request object
    // this logout() function is also provioded by passport
    // basically removes the piece of identifing token which was set on the cookie before
    req.logout();
    //res.send("you logged out");
    res.redirect("/");
  });
};
