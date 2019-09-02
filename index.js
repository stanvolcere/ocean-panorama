const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const keys = require("./config/keys");
var app = express();

// mongo db setup
mongoose.connect(keys.mongoURI);
require("./models/User");
require("./models/Booking");
require("./models/Room");
require("./models/Admin");
require("./services/passport");

// NOTE: app.use is used whenever we wish to add a middleware which we
// wish express to use
// bodyParser will parse any post request payload to a req.body variable
// app.use(bodyParser.json());
app.use(express.json());
app.use(
  cookieSession({
    // represents 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/authRoutes")(app);
require("./routes/bookingRoutes")(app);
require("./routes/roomRoutes")(app);
require("./routes/adminRoutes")(app);
require("./routes/enquiryRoutes")(app);

const publicPath = path.join(__dirname, "build");
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  // express serves up main.js file for the bundled up react app
  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(publicPath, "index.html"));
  });
}

// app.get("/", (req, res) => {
//   res.send("Ocean Panorama Landing Page");
// });

app.listen(PORT, () => {
  console.log("App started!");
});
