const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local");
const keys = require("../config/dev");
const mongoose = require("mongoose");

// one arg mena we are trying to fetch something from mongo &&
// twoa rgs means we are trying to load something into mongo
const User = mongoose.model("user");

const Admin = mongoose.model('admin');

// STEP 1 - with google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // after the user grants permission send them to this route here
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleID: profile.id });

        if (!existingUser) {
          const newUser = await new User({
            googleID: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
          }).save();
          done(null, newUser);
        }
        // called whenever we're done processing
        // user is then passed to the serializeUser function above
        // to generate a unique identifier which is placed on the cookie by passport
        done(null, existingUser);
      } catch (e) {
        done(e);
        //console.log(e);
      }
    }
  )
);

// OR FACEBOOK SIGN IN
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      // after the user grants permission send them to this route here
      callbackURL: "/auth/facebook/callback",
      proxy: true,
      profileFields: ["id", "displayName", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ facebookID: profile.id });

        if (!existingUser) {
          const newUser = await new User({
            facebookID: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
          }).save();
          done(null, newUser);
        }

        done(null, existingUser);
      } catch (e) {
        done(e);
        //console.log(e);
      }
    }
  )
);

// admin sign-in with passport-local
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const existingAdmin = await Admin.findByCredentials(username, password);

      if (!existingAdmin) {
        return done(null, false);
      }

      return done(null, existingAdmin);
    } catch (e) {
      console.log(e);
    }
  })
);

// STEP 2

// will generate an identifying token
// for the user which will be placed on a cookie
// note this is what is called immediatly after the done we called from within the strategy below
passport.serializeUser((user, done) => {
  //console.log(user.id);
  done(null, user.id);
});

// turns a user into a token to identify the user
// here
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// // route handler for handling return from the google server
// app.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));
