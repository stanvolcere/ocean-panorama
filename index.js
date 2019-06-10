const express = require("express");
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const keys = require('./config/dev');
var app = express();

// mongo db setup
require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);

// NOTE: app.use is used whenever we wish to add a middleware which we 
// wish express to use
// bodyParser will parse any post request payload to a req.body variable
app.use(bodyParser.json());
app.use(cookieSession({
    // represents 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app);
// another way could be to say
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);


app.get("/", (req, res) => {
    res.send('Ocean Panorama Landing Page');
});

app.get("/hi", (req, res) => {
    res.send('hi');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("App started!");
});