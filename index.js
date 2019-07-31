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
// another way could be to say
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);

// seeding the database
// const Booking = mongoose.model('booking');
// const Room = mongoose.model('room');

// const addAdmin = async () => {
//     const room = await new Room({
//         username: "Stan",
//         password: 'Extremely nice Apartment'
//     });

//     await room.save();
// }

// addRoom();

app.get("/", (req, res) => {
  res.send("Ocean Panorama Landing Page");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App started!");
});
