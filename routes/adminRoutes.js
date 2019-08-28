const passport = require("passport");
const mongoose = require('mongoose');
const generateToken = require('../services/generateToken');

const Admin = mongoose.model('admin');
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {

    // using passport local for login in an admin
    // if the username + password combo is valid we return the user a token to be used for 
    // subsequent authenticated requests
    app.post('/api/admin/login', requireSignIn, (req, res) => {
        res.send({ token: generateToken(req.user) });
    });

    // Sign Up a new Admin
    app.post('/api/admin', async (req, res) => {
        const admin = new Admin(req.body);

        try {
            await admin.save();
            res.status(201).send(admin);
        } catch (e) {
            res.send(e);
        }
    });
};
