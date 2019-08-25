const passport = require("passport");
const mongoose = require('mongoose');
const redis = require('redis');
const generateToken = require('../services/generateToken');
const { requireAuthUser } = require('../middleware/requireAuth');

//setup redis
const redisURL = 'redis://127.0.0.1:6379';
const redisClient = redis.createClient(redisURL);

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

      const userToken = { token: generateToken(req.user) };

      // sets the token for newly signed in user
      redisClient.set("token", userToken.token);

      res.redirect("/aftersignin");

    }
  );

  // FACEBOOK
  app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

  app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
    const userToken = { token: generateToken(req.user) };

    // sets the token for newly signed in user
    redisClient.set("token", userToken.token);

    res.redirect("/aftersignin");
  }
  );

  // General
  app.get("/api/current_user", requireAuthUser, (req, res) => {
    res.send(req.user);
  });

  app.get("/api/current_user_token", (req, res) => {
    redisClient.get("token", (err, token) => {
      res.send({ token });
    });
  });

  app.get("/api/logout", requireAuthUser, (req, res) => {

    redisClient.del("token");
    // passport automatically attacts user to the request object
    // this logout() function is also provioded by passport
    // basically removes the piece of identifing token which was set on the cookie before
    res.send();
  });
};
